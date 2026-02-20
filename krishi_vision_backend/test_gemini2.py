import os
from dotenv import load_dotenv

load_dotenv('.env')
token = os.environ.get('GEMINI_API_KEY')

import google.generativeai as genai
genai.configure(api_key=token)
model = genai.GenerativeModel('gemini-1.5-flash-8b', generation_config={'response_mime_type': 'application/json'})

try:
    with open(r'c:\Users\parth\OneDrive\Desktop\krishi_vision\krishi_vision_frontend\public\Potato-leaf-blight.webp', 'rb') as f:
        img_bytes = f.read()

    image_part = {
        'mime_type': 'image/webp',
        'data': img_bytes
    }
    
    prompt = '''You are an expert plant pathologist AI. Analyze the uploaded leaf image for diseases.
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
    }'''

    response = model.generate_content([prompt, image_part])
    print(response.text)
except Exception as e:
    import traceback
    traceback.print_exc()
