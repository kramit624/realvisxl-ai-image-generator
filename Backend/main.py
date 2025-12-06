from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from gradio_client import Client
import os
import base64

app = FastAPI()

# ✅ CORS for React (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # production me specific domain dena
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ HuggingFace Space Client (GLOBAL)
client = Client("kramit624/realvisxl-app")

# ✅ Root Health Check (404 FIX)
@app.get("/")
def root():
    return {
        "status": "✅ Backend is running successfully",
        "model": "RealVisXL via HuggingFace Space",
        "mode": "CPU Inference"
    }

# ✅ Request Schema
class Prompt(BaseModel):
    prompt: str

# ✅ Image Generation API
@app.post("/generate")
def generate_image(data: Prompt):
    try:
        result = client.predict(
            data.prompt,
            api_name="/generate"
        )

        # ✅ Gradio returns a TEMP FILE path
        if isinstance(result, str) and os.path.exists(result):

            with open(result, "rb") as f:
                image_bytes = f.read()

            image_base64 = base64.b64encode(image_bytes).decode("utf-8")

            return {
                "success": True,
                "image": image_base64
            }

        return {
            "success": False,
            "error": "Unexpected API response format"
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
