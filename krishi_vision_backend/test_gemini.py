import os
import io
from PIL import Image
from dotenv import load_dotenv

load_dotenv(".env")
token = os.environ.get("GEMINI_API_KEY")
print(f"Gemini Key length: {len(token) if token else 0}")

from ai_model import is_gemini_api_available, predict_disease_gemini
print(f"Gemini Available: {is_gemini_api_available()}")

# Give a real image to test:
test_img = Image.new("RGB", (224, 224), color=(34, 139, 34))
buf = io.BytesIO()
test_img.save(buf, format="JPEG")
img_data = buf.getvalue()

if is_gemini_api_available():
    try:
        res = predict_disease_gemini(img_data)
        print("Prediction success:")
        print(res)
    except Exception as e:
        print("Prediction error:", e)
