# server/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import json
import google.genai as genai
from dotenv import load_dotenv

base_dir = os.path.dirname(os.path.dirname(__file__))
load_dotenv(os.path.join(base_dir, '.env.local'))
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Key'ini Codespaces Secrets veya .env'den aldığından emin ol
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
model_name = "gemini-flash-latest"


class Product(BaseModel):
    id: str
    name: str
    category: str
    price: float
    stock: int
    description: str
    imageUrl: str
    active: bool

@app.post("/satici-asistani")
async def analyze_inventory(products: List[Product]):
    # Ürünleri Gemini'nin anlayacağı bir metne çeviriyoruz
    inventory_context = json.dumps([p.model_dump() for p in products], ensure_ascii=False)
    
    prompt = f"""
    Sen bir kadın girişimci için Akıllı Karar Destek sistemisin. 
    Şu ürün listesini incele: {inventory_context}
    
    Analiz Kuralları:
    1. Ürün isimlerinden yola çıkarak hangisinin daha kritik olduğunu tahmin et.
    2. Stoğu 10'un altında olanları (PRD-1004 ve 1002 gibi) çok acil olarak işaretle.
    
    Yanıtı şu JSON formatında ver:
    {{
      "analiz_notu": "Kısa bir özet",
      "kritik_stoklar": ["Ürün Adı 1", "Ürün Adı 2"],
      "kampanya_fikri": "Yaratıcı bir öneri",
      "tedarik_taslagi": "Tedarikçiye yazılacak mesaj"
    }}
    """
    
    try:
        response = client.models.generate_content(model=model_name, contents=prompt)
        ai_response = response.candidates[0].content.parts[0].text
        clean_json = ai_response.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    except Exception as e:
        return {"analiz_notu": "AI şu an analiz yapamıyor."}