"""
KrishiVision — AI Model Module
Uses the HuggingFace Inference API for plant disease classification.
Model: linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
Accuracy: ~95.4% on PlantVillage dataset (38 classes)

Two modes:
1. HuggingFace Inference API (works on Vercel — no torch needed)
2. Local model (if torch + transformers are installed)
"""

import os
import base64
import json
from PIL import Image
from io import BytesIO

# Optional: for local inference
_pipeline = None

# HuggingFace Inference API config
HF_MODEL = "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"
HF_API_URL = f"https://api-inference.huggingface.co/models/{HF_MODEL}"
HF_TOKEN = os.environ.get("HF_TOKEN", "")  # Optional, works without for public models


# Map from the HuggingFace model's 38 class labels → our disease_db IDs
LABEL_TO_DISEASE_ID = {
    "Tomato___Late_blight": "tomato_late_blight",
    "Tomato___Early_blight": "tomato_early_blight",
    "Tomato___Bacterial_spot": "tomato_bacterial_spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "tomato_yellow_leaf_curl",
    "Tomato___healthy": "healthy_leaf",
    "Tomato___Leaf_Mold": "tomato_late_blight",
    "Tomato___Septoria_leaf_spot": "tomato_early_blight",
    "Tomato___Spider_mites Two-spotted_spider_mite": "tomato_bacterial_spot",
    "Tomato___Target_Spot": "tomato_early_blight",
    "Tomato___Tomato_mosaic_virus": "tomato_yellow_leaf_curl",
    "Potato___Early_blight": "potato_early_blight",
    "Potato___Late_blight": "potato_late_blight",
    "Potato___healthy": "healthy_leaf",
    "Apple___Apple_scab": "apple_scab",
    "Apple___Black_rot": "apple_black_rot",
    "Apple___Cedar_apple_rust": "apple_scab",
    "Apple___healthy": "healthy_leaf",
    "Corn_(maize)___Common_rust_": "corn_common_rust",
    "Corn_(maize)___Northern_Leaf_Blight": "corn_northern_leaf_blight",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "corn_northern_leaf_blight",
    "Corn_(maize)___healthy": "healthy_leaf",
    "Grape___Black_rot": "grape_black_rot",
    "Grape___Esca_(Black_Measles)": "grape_black_rot",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "grape_black_rot",
    "Grape___healthy": "healthy_leaf",
    "Cherry_(including_sour)___Powdery_mildew": "apple_scab",
    "Cherry_(including_sour)___healthy": "healthy_leaf",
    "Strawberry___Leaf_scorch": "tomato_early_blight",
    "Strawberry___healthy": "healthy_leaf",
    "Peach___Bacterial_spot": "tomato_bacterial_spot",
    "Peach___healthy": "healthy_leaf",
    "Pepper,_bell___Bacterial_spot": "tomato_bacterial_spot",
    "Pepper,_bell___healthy": "healthy_leaf",
    "Soybean___healthy": "healthy_leaf",
    "Squash___Powdery_mildew": "apple_scab",
    "Raspberry___healthy": "healthy_leaf",
    "Orange___Haunglongbing_(Citrus_greening)": "citrus_greening",
    "Blueberry___healthy": "healthy_leaf",
    "Background_without_leaves": "healthy_leaf",
}


# -------------------------------------------------------------------
# HuggingFace Inference API (works on Vercel — lightweight)
# -------------------------------------------------------------------

def predict_disease_hf_api(image_bytes: bytes) -> dict:
    """
    Call the HuggingFace Inference API for plant disease classification.
    This is lightweight — no torch/transformers needed.
    """
    import requests

    headers = {}
    if HF_TOKEN:
        headers["Authorization"] = f"Bearer {HF_TOKEN}"

    # Send raw image bytes to the API
    response = requests.post(
        HF_API_URL,
        headers=headers,
        data=image_bytes,
        timeout=30,
    )

    if response.status_code == 503:
        # Model is loading — wait and retry
        import time
        print("⏳ HF model is loading, waiting 10s and retrying...")
        time.sleep(10)
        response = requests.post(
            HF_API_URL,
            headers=headers,
            data=image_bytes,
            timeout=60,
        )

    if response.status_code != 200:
        raise Exception(f"HF API error {response.status_code}: {response.text}")

    results = response.json()

    if isinstance(results, dict) and "error" in results:
        raise Exception(f"HF API error: {results['error']}")

    # Results: [{"label": "...", "score": 0.xx}, ...]
    top = results[0]
    label = top["label"]
    confidence = round(top["score"], 4)

    disease_id = LABEL_TO_DISEASE_ID.get(label, "healthy_leaf")

    return {
        "disease_id": disease_id,
        "confidence": confidence,
        "raw_label": label,
        "all_predictions": [
            {"label": r["label"], "confidence": round(r["score"], 4)}
            for r in results[:5]
        ],
    }


# -------------------------------------------------------------------
# Local model inference (when torch + transformers are installed)
# -------------------------------------------------------------------

def get_model():
    """Lazy-load the HuggingFace image classification pipeline."""
    global _pipeline
    if _pipeline is None:
        print("🧠 Loading AI model (first time — may take 30-60 seconds)...")
        try:
            from transformers import pipeline
            _pipeline = pipeline(
                "image-classification",
                model=HF_MODEL,
                top_k=5,
            )
            print("✅ AI model loaded successfully!")
        except Exception as e:
            print(f"❌ Failed to load AI model: {e}")
            raise e
    return _pipeline


def predict_disease_local(image_bytes: bytes) -> dict:
    """Run local AI inference on a leaf image."""
    img = Image.open(BytesIO(image_bytes))
    if img.mode != "RGB":
        img = img.convert("RGB")

    model = get_model()
    results = model(img)

    top = results[0]
    label = top["label"]
    confidence = round(top["score"], 4)

    disease_id = LABEL_TO_DISEASE_ID.get(label, "healthy_leaf")

    return {
        "disease_id": disease_id,
        "confidence": confidence,
        "raw_label": label,
        "all_predictions": [
            {"label": r["label"], "confidence": round(r["score"], 4)}
            for r in results
        ],
    }


# -------------------------------------------------------------------
# Public API: auto-selects the best available method
# -------------------------------------------------------------------

def is_model_available() -> bool:
    """Check if local model dependencies are installed."""
    try:
        import transformers
        import torch
        return True
    except ImportError:
        return False


def is_hf_api_available() -> bool:
    """Check if requests is installed (for HF Inference API)."""
    try:
        import requests
        return True
    except ImportError:
        return False


def predict_disease(image_bytes: bytes) -> dict:
    """
    Main prediction function — auto-selects the best available method:
    1. Local model (if torch + transformers installed)
    2. HuggingFace Inference API (lightweight, works on Vercel)
    """
    # Try local model first
    if is_model_available():
        try:
            return predict_disease_local(image_bytes)
        except Exception as e:
            print(f"⚠️ Local model failed: {e}")

    # Fall back to HuggingFace Inference API
    if is_hf_api_available():
        return predict_disease_hf_api(image_bytes)

    raise Exception("No prediction method available")
