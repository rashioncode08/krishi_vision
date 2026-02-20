"""
KrishiVision — Curated Crop Disease Database
Based on the PlantVillage dataset's 38-class taxonomy.
Each entry contains: disease name, crop, description, treatment, and prevention tips.
"""

DISEASE_DATABASE = [
    {
        "id": "tomato_late_blight",
        "disease": "Late Blight",
        "crop": "Tomato",
        "confidence_range": (0.85, 0.97),
        "description": (
            "Late blight is a serious disease caused by the fungus-like organism "
            "Phytophthora infestans. It spreads rapidly in cool, wet conditions and "
            "can destroy an entire tomato crop within days. Look for dark, water-soaked "
            "spots on leaves that turn brown and papery."
        ),
        "treatment": [
            {"text": "Apply copper-based fungicide spray immediately", "eco_friendly": True},
            {"text": "Remove and destroy all infected plant parts — do not compost them", "eco_friendly": True},
            {"text": "Apply Mancozeb or Chlorothalonil fungicide as directed", "eco_friendly": False},
            {"text": "Use neem oil spray (2-3 tablespoons per gallon of water) as a natural alternative", "eco_friendly": True},
        ],
        "prevention": [
            "Space plants 24-36 inches apart for good air circulation",
            "Water at the base of plants — avoid wetting leaves",
            "Use disease-resistant tomato varieties (e.g., Mountain Magic, Defiant)",
            "Rotate crops — don't plant tomatoes in the same spot for 3 years",
            "Mulch around plants to prevent soil splash onto leaves",
        ],
    },
    {
        "id": "tomato_early_blight",
        "disease": "Early Blight",
        "crop": "Tomato",
        "confidence_range": (0.82, 0.95),
        "description": (
            "Early blight is caused by the fungus Alternaria solani. It typically "
            "appears as dark, concentric rings (bull's-eye pattern) on lower, older "
            "leaves first. The disease can reduce fruit yield significantly if untreated."
        ),
        "treatment": [
            {"text": "Spray with baking soda solution (1 tbsp per gallon water)", "eco_friendly": True},
            {"text": "Apply neem oil every 7-14 days during growing season", "eco_friendly": True},
            {"text": "Use Chlorothalonil-based fungicide for severe cases", "eco_friendly": False},
            {"text": "Remove lower affected leaves to slow spread", "eco_friendly": True},
        ],
        "prevention": [
            "Mulch heavily around tomato plants to prevent soil splash",
            "Stake or cage plants to keep foliage off the ground",
            "Avoid overhead watering — use drip irrigation",
            "Rotate crops on a 2-3 year cycle",
            "Plant resistant varieties when available",
        ],
    },
    {
        "id": "tomato_bacterial_spot",
        "disease": "Bacterial Spot",
        "crop": "Tomato",
        "confidence_range": (0.78, 0.93),
        "description": (
            "Bacterial spot is caused by Xanthomonas species. It causes small, "
            "dark, raised spots on leaves and fruit. In warm, humid weather it "
            "spreads very quickly through splashing water and contaminated tools."
        ),
        "treatment": [
            {"text": "Apply copper hydroxide spray at first sign of disease", "eco_friendly": True},
            {"text": "Use a mixture of copper and mancozeb for better control", "eco_friendly": False},
            {"text": "Remove and destroy severely infected plants", "eco_friendly": True},
            {"text": "Spray with Bacillus-based biological fungicide", "eco_friendly": True},
        ],
        "prevention": [
            "Use certified disease-free seeds and transplants",
            "Avoid working with plants when they are wet",
            "Disinfect tools with 10% bleach solution between plants",
            "Improve air circulation by proper spacing",
            "Avoid overhead irrigation",
        ],
    },
    {
        "id": "tomato_yellow_leaf_curl",
        "disease": "Yellow Leaf Curl Virus",
        "crop": "Tomato",
        "confidence_range": (0.80, 0.96),
        "description": (
            "Tomato Yellow Leaf Curl Virus (TYLCV) is transmitted by whiteflies. "
            "Infected plants show severe stunting, upward curling of leaves, and "
            "yellowing of leaf margins. Fruit production drops dramatically."
        ),
        "treatment": [
            {"text": "Remove and destroy infected plants immediately to prevent spread", "eco_friendly": True},
            {"text": "Control whiteflies with yellow sticky traps", "eco_friendly": True},
            {"text": "Spray neem oil to deter whiteflies", "eco_friendly": True},
            {"text": "Use reflective mulch to repel whiteflies", "eco_friendly": True},
        ],
        "prevention": [
            "Use TYLCV-resistant tomato varieties",
            "Install fine-mesh insect netting over young plants",
            "Control weeds that may harbor whiteflies",
            "Avoid planting near infected fields",
            "Use yellow sticky traps to monitor whitefly populations",
        ],
    },
    {
        "id": "potato_early_blight",
        "disease": "Early Blight",
        "crop": "Potato",
        "confidence_range": (0.83, 0.94),
        "description": (
            "Potato early blight, caused by Alternaria solani, creates dark brown "
            "lesions with concentric rings on leaves. It starts on lower leaves and "
            "moves upward. Tubers can also develop dark, leathery spots."
        ),
        "treatment": [
            {"text": "Apply copper fungicide spray every 7-10 days", "eco_friendly": True},
            {"text": "Use Mancozeb-based fungicide for moderate infections", "eco_friendly": False},
            {"text": "Remove infected leaves and destroy them", "eco_friendly": True},
            {"text": "Apply compost tea as a mild biological control", "eco_friendly": True},
        ],
        "prevention": [
            "Plant certified, disease-free seed potatoes",
            "Ensure good air circulation between rows",
            "Hill soil around plants to protect tubers",
            "Avoid overhead irrigation — water at the base",
            "Rotate with non-solanaceous crops for 2-3 years",
        ],
    },
    {
        "id": "potato_late_blight",
        "disease": "Late Blight",
        "crop": "Potato",
        "confidence_range": (0.86, 0.97),
        "description": (
            "Potato late blight, caused by Phytophthora infestans (the same organism "
            "that caused the Irish Potato Famine), produces water-soaked dark patches "
            "on leaves that quickly expand. A white mold may appear on leaf undersides."
        ),
        "treatment": [
            {"text": "Apply copper-based fungicide immediately upon detection", "eco_friendly": True},
            {"text": "Spray Mancozeb + Metalaxyl combination for severe cases", "eco_friendly": False},
            {"text": "Destroy all infected plant material — burn or bag it", "eco_friendly": True},
            {"text": "Harvest tubers as soon as possible if infection is advanced", "eco_friendly": True},
        ],
        "prevention": [
            "Use resistant potato varieties (e.g., Sarpo Mira)",
            "Do not plant near tomato crops (shared disease)",
            "Ensure excellent drainage in the field",
            "Monitor weather forecasts — apply preventive sprays before wet periods",
            "Destroy volunteer potato plants from previous seasons",
        ],
    },
    {
        "id": "apple_scab",
        "disease": "Apple Scab",
        "crop": "Apple",
        "confidence_range": (0.84, 0.96),
        "description": (
            "Apple scab is caused by the fungus Venturia inaequalis. It produces "
            "olive-green to dark brown velvety spots on leaves and fruit. Severely "
            "infected leaves may curl and drop early, weakening the tree."
        ),
        "treatment": [
            {"text": "Apply sulfur-based fungicide in early spring", "eco_friendly": True},
            {"text": "Spray with neem oil during the growing season", "eco_friendly": True},
            {"text": "Use Captan or Myclobutanil for severe infections", "eco_friendly": False},
            {"text": "Rake and destroy fallen infected leaves in autumn", "eco_friendly": True},
        ],
        "prevention": [
            "Plant scab-resistant apple varieties (e.g., Liberty, Enterprise)",
            "Prune trees to improve air circulation through the canopy",
            "Clean up all fallen leaves and fruit in autumn",
            "Apply preventive fungicide before rainy spring periods",
            "Avoid overhead irrigation of apple trees",
        ],
    },
    {
        "id": "apple_black_rot",
        "disease": "Black Rot",
        "crop": "Apple",
        "confidence_range": (0.80, 0.93),
        "description": (
            "Black rot is caused by the fungus Botryosphaeria obtusa. It causes "
            "circular brown lesions on fruit that expand with concentric rings. "
            "Leaves develop 'frogeye' leaf spots — tan centers with purple borders."
        ),
        "treatment": [
            {"text": "Prune out all dead or diseased wood during dormant season", "eco_friendly": True},
            {"text": "Apply copper fungicide at green tip stage", "eco_friendly": True},
            {"text": "Remove mummified fruit from trees and ground", "eco_friendly": True},
            {"text": "Use Captan fungicide during bloom for severe cases", "eco_friendly": False},
        ],
        "prevention": [
            "Maintain proper tree hygiene — remove dead branches",
            "Harvest fruit promptly when ripe",
            "Improve air circulation through careful pruning",
            "Remove wild or abandoned apple trees nearby",
            "Apply dormant oil spray before bud break",
        ],
    },
    {
        "id": "corn_common_rust",
        "disease": "Common Rust",
        "crop": "Corn (Maize)",
        "confidence_range": (0.81, 0.94),
        "description": (
            "Common rust of corn is caused by the fungus Puccinia sorghi. It produces "
            "small, reddish-brown pustules (like tiny blisters) on both leaf surfaces. "
            "Severe infections can reduce photosynthesis and lower grain yield."
        ),
        "treatment": [
            {"text": "Apply triazole-based fungicide when pustules first appear", "eco_friendly": False},
            {"text": "Spray neem oil as a mild natural deterrent", "eco_friendly": True},
            {"text": "For small plots, remove heavily infected leaves by hand", "eco_friendly": True},
            {"text": "Use strobilurin fungicide for large-scale farming", "eco_friendly": False},
        ],
        "prevention": [
            "Plant rust-resistant corn hybrids",
            "Plant early in the season to avoid peak rust conditions",
            "Avoid excessive nitrogen fertilization",
            "Maintain proper plant spacing for air flow",
            "Scout fields regularly to catch infections early",
        ],
    },
    {
        "id": "corn_northern_leaf_blight",
        "disease": "Northern Leaf Blight",
        "crop": "Corn (Maize)",
        "confidence_range": (0.79, 0.93),
        "description": (
            "Northern corn leaf blight is caused by the fungus Exserohilum turcicum. "
            "It produces long, cigar-shaped grayish-green lesions on leaves. It thrives "
            "in moderate temperatures (65-80°F) with heavy dew or rain."
        ),
        "treatment": [
            {"text": "Apply foliar fungicide (azoxystrobin or propiconazole) at first sign", "eco_friendly": False},
            {"text": "Remove heavily blighted lower leaves if practical", "eco_friendly": True},
            {"text": "Use biological control products containing Trichoderma", "eco_friendly": True},
            {"text": "Apply potassium bicarbonate spray as organic option", "eco_friendly": True},
        ],
        "prevention": [
            "Choose resistant corn hybrids with Ht genes",
            "Practice crop rotation with non-host crops",
            "Till under corn residue after harvest to reduce inoculum",
            "Avoid planting corn after corn in wet regions",
            "Monitor fields weekly during humid growing periods",
        ],
    },
    {
        "id": "grape_black_rot",
        "disease": "Black Rot",
        "crop": "Grape",
        "confidence_range": (0.83, 0.95),
        "description": (
            "Grape black rot is caused by the fungus Guignardia bidwellii. It causes "
            "circular reddish-brown spots on leaves and shriveled, hard black 'mummies' "
            "on fruit. It's one of the most destructive grape diseases in humid climates."
        ),
        "treatment": [
            {"text": "Apply Myclobutanil fungicide starting at early bloom", "eco_friendly": False},
            {"text": "Spray copper-based fungicide as organic alternative", "eco_friendly": True},
            {"text": "Remove and destroy all mummified berries", "eco_friendly": True},
            {"text": "Prune vines to improve air circulation", "eco_friendly": True},
        ],
        "prevention": [
            "Remove mummified fruit from vines and ground during winter",
            "Ensure excellent air circulation through proper canopy management",
            "Apply preventive fungicide sprays from bud break through veraison",
            "Choose disease-resistant grape varieties when possible",
            "Maintain weed-free vineyard floor",
        ],
    },
    {
        "id": "rice_brown_spot",
        "disease": "Brown Spot",
        "crop": "Rice",
        "confidence_range": (0.80, 0.94),
        "description": (
            "Rice brown spot is caused by the fungus Bipolaris oryzae. It produces "
            "circular to oval brown spots with gray centers on leaves. It's more severe "
            "in nutrient-deficient soils, especially those low in potassium and silicon."
        ),
        "treatment": [
            {"text": "Apply Tricyclazole or Propiconazole fungicide as foliar spray", "eco_friendly": False},
            {"text": "Use Pseudomonas-based biocontrol agents", "eco_friendly": True},
            {"text": "Spray with potassium silicate solution to strengthen plant cells", "eco_friendly": True},
            {"text": "Apply neem cake to the soil as organic amendment", "eco_friendly": True},
        ],
        "prevention": [
            "Apply balanced fertilizers — especially potassium and silicon",
            "Use certified healthy seeds treated with fungicide",
            "Maintain proper water management in paddy fields",
            "Avoid excessive nitrogen fertilization",
            "Plant resistant rice varieties suited to your region",
        ],
    },
    {
        "id": "wheat_leaf_rust",
        "disease": "Leaf Rust",
        "crop": "Wheat",
        "confidence_range": (0.82, 0.95),
        "description": (
            "Wheat leaf rust is caused by the fungus Puccinia triticina. It produces "
            "small, round, orange-brown pustules mainly on the upper surface of leaves. "
            "Severe infections can reduce grain filling and lower yield by up to 40%."
        ),
        "treatment": [
            {"text": "Apply propiconazole or tebuconazole fungicide at first sign", "eco_friendly": False},
            {"text": "Use biological control agents containing Bacillus subtilis", "eco_friendly": True},
            {"text": "Spray potassium bicarbonate as an organic option", "eco_friendly": True},
            {"text": "Apply sulfur-based fungicide for mild infections", "eco_friendly": True},
        ],
        "prevention": [
            "Plant rust-resistant wheat varieties",
            "Sow at the recommended time — avoid late planting",
            "Destroy volunteer wheat plants that harbor rust spores",
            "Apply balanced fertilization — avoid excess nitrogen",
            "Scout fields regularly from tillering to grain fill stage",
        ],
    },
    {
        "id": "citrus_greening",
        "disease": "Citrus Greening (Huanglongbing)",
        "crop": "Citrus",
        "confidence_range": (0.77, 0.92),
        "description": (
            "Citrus greening, also called Huanglongbing (HLB), is caused by the "
            "bacterium Candidatus Liberibacter. Spread by the Asian citrus psyllid, "
            "it causes yellow mottling of leaves, misshapen bitter fruit, and eventual tree death."
        ),
        "treatment": [
            {"text": "There is no cure — remove and destroy infected trees to protect others", "eco_friendly": True},
            {"text": "Control psyllid vectors with systemic insecticides (imidacloprid)", "eco_friendly": False},
            {"text": "Release natural predators like Tamarixia wasps for psyllid control", "eco_friendly": True},
            {"text": "Apply nutritional sprays to prolong productivity of mildly infected trees", "eco_friendly": True},
        ],
        "prevention": [
            "Plant only certified disease-free nursery stock",
            "Monitor for Asian citrus psyllids with yellow sticky traps",
            "Maintain a comprehensive psyllid control program",
            "Remove all symptomatic trees promptly",
            "Do not move citrus plant material from quarantined areas",
        ],
    },
    {
        "id": "healthy_leaf",
        "disease": "Healthy — No Disease Detected",
        "crop": "Various",
        "confidence_range": (0.88, 0.99),
        "description": (
            "Good news! This leaf appears to be healthy with no visible signs of "
            "disease, pest damage, or nutritional deficiency. The leaf shows normal "
            "color, texture, and structure."
        ),
        "treatment": [
            {"text": "No treatment needed — your crop looks great!", "eco_friendly": True},
            {"text": "Continue regular watering and fertilization schedule", "eco_friendly": True},
            {"text": "Monitor regularly for early signs of any disease", "eco_friendly": True},
        ],
        "prevention": [
            "Maintain good crop hygiene — remove debris and weeds",
            "Ensure proper spacing between plants for air circulation",
            "Use balanced fertilizers and avoid over-watering",
            "Rotate crops each season to prevent disease buildup",
            "Scout your fields weekly for any changes in leaf appearance",
        ],
    },
]


def get_disease_classes() -> list[str]:
    """Return list of all disease IDs for classification."""
    return [d["id"] for d in DISEASE_DATABASE]


def get_disease_info(disease_id: str) -> dict | None:
    """Look up full disease information by ID."""
    for d in DISEASE_DATABASE:
        if d["id"] == disease_id:
            return d
    return None
