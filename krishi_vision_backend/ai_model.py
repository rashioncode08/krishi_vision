"""
KrishiVision — AI Model Module
Uses a pre-trained MobileNetV2 from HuggingFace for plant disease classification.
Model: linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification
Accuracy: ~95.4% on PlantVillage dataset (38 classes)
"""

import os
from PIL import Image
from io import BytesIO

# Global model + processor (lazy loaded)
_pipeline = None


# Map from the HuggingFace model's 38 class labels → our disease_db IDs
# The model uses labels like "Tomato___Late_blight" format
LABEL_TO_DISEASE_ID = {
    "Tomato___Late_blight": "tomato_late_blight",
    "Tomato___Early_blight": "tomato_early_blight",
    "Tomato___Bacterial_spot": "tomato_bacterial_spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "tomato_yellow_leaf_curl",
    "Tomato___healthy": "healthy_leaf",
    "Tomato___Leaf_Mold": "tomato_late_blight",  # closest match
    "Tomato___Septoria_leaf_spot": "tomato_early_blight",  # closest match
    "Tomato___Spider_mites Two-spotted_spider_mite": "tomato_bacterial_spot",  # closest match
    "Tomato___Target_Spot": "tomato_early_blight",  # closest match
    "Tomato___Tomato_mosaic_virus": "tomato_yellow_leaf_curl",  # closest match
    "Potato___Early_blight": "potato_early_blight",
    "Potato___Late_blight": "potato_late_blight",
    "Potato___healthy": "healthy_leaf",
    "Apple___Apple_scab": "apple_scab",
    "Apple___Black_rot": "apple_black_rot",
    "Apple___Cedar_apple_rust": "apple_scab",  # closest match
    "Apple___healthy": "healthy_leaf",
    "Corn_(maize)___Common_rust_": "corn_common_rust",
    "Corn_(maize)___Northern_Leaf_Blight": "corn_northern_leaf_blight",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "corn_northern_leaf_blight",  # closest
    "Corn_(maize)___healthy": "healthy_leaf",
    "Grape___Black_rot": "grape_black_rot",
    "Grape___Esca_(Black_Measles)": "grape_black_rot",  # closest match
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "grape_black_rot",  # closest match
    "Grape___healthy": "healthy_leaf",
    "Cherry_(including_sour)___Powdery_mildew": "apple_scab",  # closest match
    "Cherry_(including_sour)___healthy": "healthy_leaf",
    "Strawberry___Leaf_scorch": "tomato_early_blight",  # closest match
    "Strawberry___healthy": "healthy_leaf",
    "Peach___Bacterial_spot": "tomato_bacterial_spot",  # closest match
    "Peach___healthy": "healthy_leaf",
    "Pepper,_bell___Bacterial_spot": "tomato_bacterial_spot",  # closest match
    "Pepper,_bell___healthy": "healthy_leaf",
    "Soybean___healthy": "healthy_leaf",
    "Squash___Powdery_mildew": "apple_scab",  # closest match
    "Raspberry___healthy": "healthy_leaf",
    "Orange___Haunglongbing_(Citrus_greening)": "citrus_greening",
    "Blueberry___healthy": "healthy_leaf",
    "Background_without_leaves": "healthy_leaf",
}


def get_model():
    """Lazy-load the HuggingFace image classification pipeline."""
    global _pipeline
    if _pipeline is None:
        print("🧠 Loading AI model (first time — may take 30-60 seconds)...")
        try:
            from transformers import pipeline
            _pipeline = pipeline(
                "image-classification",
                model="linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
                top_k=5,
            )
            print("✅ AI model loaded successfully!")
        except Exception as e:
            print(f"❌ Failed to load AI model: {e}")
            raise e
    return _pipeline


def predict_disease(image_bytes: bytes) -> dict:
    """
    Run real AI inference on a leaf image.

    Returns:
        dict with keys: disease_id, confidence, all_predictions
    """
    # Open and preprocess image
    img = Image.open(BytesIO(image_bytes))
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Run inference
    model = get_model()
    results = model(img)

    # Get top prediction
    top = results[0]
    label = top["label"]
    confidence = round(top["score"], 4)

    # Map to our disease_db entry
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


def is_model_available() -> bool:
    """Check if model dependencies are installed."""
    try:
        import transformers
        import torch
        return True
    except ImportError:
        return False
