import os
import io
import json
from PIL import Image
from dotenv import load_dotenv

load_dotenv(".env")
token = os.environ.get("GEMINI_API_KEY")
print(f"Gemini Key length: {len(token) if token else 0}")

from ai_model import is_gemini_api_available, predict_disease_gemini
print(f"Gemini Available: {is_gemini_api_available()}")

# Load the user's potato leaf image
try:
    with open(r"c:\Users\parth\OneDrive\Desktop\krishi_vision\krishi_vision_frontend\public\Potato-leaf-blight.webp", "rb") as f:
        img_bytes = f.read()
    
    print("\n--- Testing predict_disease_gemini ---")
    res = predict_disease_gemini(img_bytes)
    print("Prediction success:")
    print(json.dumps(res, indent=2))
except Exception as e:
    import traceback
    print("Test failed with error:")
    traceback.print_exc()
