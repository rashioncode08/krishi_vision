"""
KrishiVision Backend — FastAPI
Crop disease detection API with image upload and AI prediction.
"""

import hashlib
import random
from io import BytesIO

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from disease_db import DISEASE_DATABASE, get_disease_info

# ---------------------------------------------------------------------------
# App Setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="KrishiVision API",
    description="AI-powered crop disease detection for farmers",
    version="1.0.0",
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
# Mock Inference Engine
# ---------------------------------------------------------------------------
# In production, replace this with a real TensorFlow/PyTorch model:
#   model = tf.keras.models.load_model("plant_disease_model.h5")
#   predictions = model.predict(preprocessed_image_array)
# ---------------------------------------------------------------------------


def mock_predict(image_bytes: bytes) -> dict:
    """
    Simulate AI model inference.
    Uses a hash of the image to deterministically pick a disease,
    so the same image always returns the same result.
    """
    # Create a deterministic seed from the image content
    image_hash = hashlib.md5(image_bytes).hexdigest()
    seed = int(image_hash[:8], 16)
    rng = random.Random(seed)

    # Select a disease based on the image hash
    disease_entry = rng.choice(DISEASE_DATABASE)

    # Generate a confidence score within the disease's typical range
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

    # Run prediction (mock inference)
    prediction = mock_predict(image_bytes)

    # Fetch disease details
    disease_data = get_disease_info(prediction["disease_id"])
    if disease_data is None:
        raise HTTPException(status_code=500, detail="Internal error: disease not found in database.")

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
    }
