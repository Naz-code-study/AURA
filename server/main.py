from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

from services.inventory_ai import analyze_inventory_service
from services.campaign_ai import generate_campaign
from .gemini_service import GeminiAssistant

ai_assistant = GeminiAssistant()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# MODELS
# -------------------------

class Product(BaseModel):
    id: str
    name: str
    category: str
    price: float
    stock: int
    description: str
    imageUrl: str
    active: bool


# -------------------------
# ENDPOINT 1 - INVENTORY ANALYSIS
# -------------------------

@app.post("/satici-asistani")
async def analyze_inventory(products: List[Product]):
    return analyze_inventory_service(products)


# -------------------------
# ENDPOINT 2 - CAMPAIGN AI
# -------------------------

@app.post("/ai/campaign-suggestion")
async def campaign_suggestion(payload: dict):
    try:
        return generate_campaign(payload)
    except Exception:
        return {
            "headline": "AI şu an çalışmıyor",
            "body": "Lütfen daha sonra tekrar deneyin",
            "tags": [],
            "secondary": []
        }
        # ----------------------------------
# ENDPOINT 3 - CARGO AI ANALYSIS
# ----------------------------------

@app.post("/ai/cargo-analysis")
async def analyze_cargo(phone: str, user_message: str):
    # Bu veri normalde kargo modülünden dinamik gelecek
    # Şimdilik dün hazırladığımız mock veriyi kullanıyoruz
    cargo_data = {
        "customer": "Ahmet Yılmaz", 
        "phone": phone, 
        "status": "yolda", 
        "carrier_alert": "yoğunluk", 
        "issue_action": "TELAFİ15"
    }
    
    # Gemini servisini kullanarak analizi gerçekleştir
    return ai_assistant.analyze_cargo_logic(cargo_data, user_message)
