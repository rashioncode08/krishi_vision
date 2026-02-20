"""
KrishiVision — AI Model Module
Uses the Google Gemini API (gemini-1.5-flash) for plant disease classification.
Accuracy: Excellent at identifying diseases from images.

Two modes:
1. Gemini API (lightweight, highly accurate, works on Vercel)
2. Local model (if torch + transformers are installed)
"""

import os
import json
import base64
from PIL import Image
from io import BytesIO

# Optional: for local inference
_pipeline = None

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

# We keep the old HF mapping for local inference if still used, but Gemini will
# output our native `disease_id` format directly based on the prompt.
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
# Google Gemini API
# -------------------------------------------------------------------

def get_gemini_client():
    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)
    
    # We specify JSON output format to ensure we easily parse it
    model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"response_mime_type": "application/json"})
    return model

def predict_disease_gemini(image_bytes: bytes) -> dict:
    """
    Call the Google Gemini API to analyze the plant image.
    Outputs JSON matching our required format.
    """
    if not GEMINI_API_KEY:
        raise Exception("GEMINI_API_KEY is not set.")

    import google.generativeai as genai
    model = get_gemini_client()
    
    img = Image.open(BytesIO(image_bytes))
    if img.mode != "RGB":
        img = img.convert("RGB")

    prompt = """
    You are an expert plant pathologist AI. Analyze the uploaded leaf image for diseases.
    You MUST output valid JSON only.

    Important: You must classify the image into ONE of the following exact `disease_id` strings:
    tomato_late_blight, tomato_early_blight, tomato_bacterial_spot, tomato_yellow_leaf_curl,
    potato_early_blight, potato_late_blight, apple_scab, apple_black_rot,
    corn_common_rust, corn_northern_leaf_blight, grape_black_rot, rice_brown_spot,
    wheat_leaf_rust, citrus_greening, or healthy_leaf.

    If the image is not a plant leaf, or is a healthy leaf, use "healthy_leaf".
    If it's a disease not exactly on the list but very similar (e.g. powder mildew), pick the closest match.

    Return JSON strictly in this format:
    {
        "disease_id": "one_of_the_exact_strings_above",
        "confidence": 0.95,
        "raw_label": "A short English name of what you saw"
    }
    """

    try:
        response = model.generate_content([prompt, img])
        result = json.loads(response.text.strip())
        
        disease_id = result.get("disease_id", "healthy_leaf")
        confidence = float(result.get("confidence", 0.92))
        raw_label = result.get("raw_label", disease_id)

        # Basic validation against our allowed IDs
        valid_ids = [
            "tomato_late_blight", "tomato_early_blight", "tomato_bacterial_spot", "tomato_yellow_leaf_curl",
            "potato_early_blight", "potato_late_blight", "apple_scab", "apple_black_rot",
            "corn_common_rust", "corn_northern_leaf_blight", "grape_black_rot", "rice_brown_spot",
            "wheat_leaf_rust", "citrus_greening", "healthy_leaf"
        ]
        if disease_id not in valid_ids:
            disease_id = "healthy_leaf"

        return {
            "disease_id": disease_id,
            "confidence": confidence,
            "raw_label": raw_label,
            "all_predictions": [
                {"label": raw_label, "confidence": confidence}
            ]
        }
    except Exception as e:
        raise Exception(f"Gemini API Error: {str(e)}")


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
                model="ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease",
                top_k=5,
            )
            print("✅ AI model loaded successfully!")
        except Exception as e:
            print(f"❌ Failed to load AI model: {e}")
            raise e
    return _pipeline


def predict_disease_local(image_bytes: bytes) -> dict:
    """Run local AI inference on a leaf image using HuggingFace."""
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


def is_gemini_api_available() -> bool:
    """Check if google.generativeai is installed and GEMINI_API_KEY is set."""
    try:
        import google.generativeai
        return bool(GEMINI_API_KEY)
    except ImportError:
        return False


def predict_disease(image_bytes: bytes) -> dict:
    """
    Main prediction function — auto-selects the best available method:
    1. Local HF model (if torch + transformers installed)
    2. Google Gemini API (lightweight, highly accurate, works on Vercel)
    """
    # Try local model first (optional, useful for edge/offline)
    if is_model_available():
        try:
            return predict_disease_local(image_bytes)
        except Exception as e:
            print(f"⚠️ Local model failed: {e}")

    # Fall back to Gemini API
    if is_gemini_api_available():
        return predict_disease_gemini(image_bytes)

    raise Exception("No active prediction method available. Please provide GEMINI_API_KEY.")
