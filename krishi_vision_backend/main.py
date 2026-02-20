"""
KrishiVision Backend — FastAPI
Crop disease detection API with image upload and AI prediction.
"""

import hashlib
import random
from io import BytesIO
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from disease_db import DISEASE_DATABASE, get_disease_info
from database import init_db, save_scan, get_recent_scans, get_disease_stats
from ai_model import predict_disease as ai_predict, is_model_available

# ---------------------------------------------------------------------------
# App Setup
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database tables
    try:
        init_db()
    except Exception as e:
        print(f"⚠️ Database init failed (will still work without DB): {e}")
    yield

app = FastAPI(
    title="KrishiVision API",
    description="AI-powered crop disease detection for farmers",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend on localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Image Preprocessing
# ---------------------------------------------------------------------------

TARGET_SIZE = (224, 224)


def preprocess_image(image_bytes: bytes) -> dict:
    """
    Validate and preprocess the uploaded image.
    Returns metadata about the preprocessed image.
    """
    try:
        img = Image.open(BytesIO(image_bytes))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file. Please upload a JPG or PNG image.")

    # Convert to RGB if needed (handles RGBA, grayscale, etc.)
    if img.mode != "RGB":
        img = img.convert("RGB")

    original_size = img.size

    # Resize to model input size
    img_resized = img.resize(TARGET_SIZE, Image.LANCZOS)

    return {
        "original_width": original_size[0],
        "original_height": original_size[1],
        "preprocessed_size": TARGET_SIZE,
        "format": img.format or "UNKNOWN",
    }


# ---------------------------------------------------------------------------
# Inference Engine
# ---------------------------------------------------------------------------
# Uses real HuggingFace MobileNetV2 model if available,
# falls back to mock prediction otherwise.
# ---------------------------------------------------------------------------

USE_REAL_MODEL = is_model_available()


def mock_predict(image_bytes: bytes) -> dict:
    """
    Fallback: simulate AI model inference when real model is unavailable.
    Uses a hash of the image to deterministically pick a disease.
    """
    image_hash = hashlib.md5(image_bytes).hexdigest()
    seed = int(image_hash[:8], 16)
    rng = random.Random(seed)
    disease_entry = rng.choice(DISEASE_DATABASE)
    low, high = disease_entry["confidence_range"]
    confidence = round(rng.uniform(low, high), 4)
    return {
        "disease_id": disease_entry["id"],
        "confidence": confidence,
    }


# ---------------------------------------------------------------------------
# API Routes
# ---------------------------------------------------------------------------

@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "KrishiVision API",
        "version": "1.0.0",
        "ai_model": "real (MobileNetV2)" if USE_REAL_MODEL else "mock (demo)",
        "message": "Upload a leaf image to /predict to detect crop diseases.",
    }


@app.get("/diseases")
async def list_diseases():
    """List all diseases the model can detect."""
    return {
        "total": len(DISEASE_DATABASE),
        "diseases": [
            {
                "id": d["id"],
                "disease": d["disease"],
                "crop": d["crop"],
            }
            for d in DISEASE_DATABASE
        ],
    }


@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    """
    Upload a leaf image and get disease prediction.

    Accepts: JPG, PNG, WEBP images
    Returns: Disease name, confidence, description, treatment, prevention
    """
    # Validate file type
    allowed_types = {"image/jpeg", "image/png", "image/webp", "image/jpg"}
    if file.content_type and file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{file.content_type}'. Please upload a JPG, PNG, or WEBP image.",
        )

    # Read image bytes
    image_bytes = await file.read()

    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if len(image_bytes) > 10 * 1024 * 1024:  # 10 MB limit
        raise HTTPException(status_code=400, detail="Image too large. Maximum size is 10 MB.")

    # Preprocess the image
    image_info = preprocess_image(image_bytes)

    # Run prediction — real AI model with mock fallback
    model_type = "mock"
    try:
        if USE_REAL_MODEL:
            prediction = ai_predict(image_bytes)
            model_type = "ai"
        else:
            prediction = mock_predict(image_bytes)
    except Exception as e:
        print(f"⚠️ AI model failed, falling back to mock: {e}")
        prediction = mock_predict(image_bytes)

    # Fetch disease details
    disease_data = get_disease_info(prediction["disease_id"])
    if disease_data is None:
        raise HTTPException(status_code=500, detail="Internal error: disease not found in database.")

    # Save scan to database
    try:
        image_size_kb = round(len(image_bytes) / 1024, 2)
        save_scan(
            disease_name=disease_data["disease"],
            crop=disease_data["crop"],
            confidence=prediction["confidence"],
            image_filename=file.filename,
            image_size_kb=image_size_kb,
        )
    except Exception as e:
        print(f"⚠️ Failed to save scan to DB: {e}")

    # Build response
    return {
        "success": True,
        "prediction": {
            "disease": disease_data["disease"],
            "crop": disease_data["crop"],
            "confidence": prediction["confidence"],
            "confidence_percent": round(prediction["confidence"] * 100, 1),
        },
        "details": {
            "description": disease_data["description"],
            "treatment": disease_data["treatment"],
            "prevention": disease_data["prevention"],
        },
        "image_info": image_info,
        "model_type": model_type,
    }


@app.get("/history")
async def scan_history(limit: int = 20):
    """Get recent scan history from the database."""
    try:
        scans = get_recent_scans(limit)
        return {
            "success": True,
            "total": len(scans),
            "scans": [
                {
                    "id": s["id"],
                    "disease": s["disease_name"],
                    "crop": s["crop"],
                    "confidence": s["confidence"],
                    "filename": s["image_filename"],
                    "scanned_at": str(s["scanned_at"]),
                }
                for s in scans
            ],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")


@app.get("/stats")
async def disease_statistics():
    """Get disease detection statistics."""
    try:
        stats = get_disease_stats()
        return {
            "success": True,
            "total_scans": stats["total_scans"],
            "by_disease": [
                {
                    "disease": s["disease_name"],
                    "crop": s["crop"],
                    "total_scans": s["total_scans"],
                    "last_scanned": str(s["last_scanned"]),
                }
                for s in stats["by_disease"]
            ],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
