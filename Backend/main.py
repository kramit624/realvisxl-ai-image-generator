from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from gradio_client import Client
import shutil
import os

app = FastAPI()

# ✅ CORS for React (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ HuggingFace Space Client
client = Client("kramit624/realvisxl-app")

class Prompt(BaseModel):
    prompt: str

@app.post("/generate")
def generate_image(data: Prompt):
    try:
        result = client.predict(
            data.prompt,
            api_name="/generate"
        )

        # ✅ result ek temp file path hota hai
        if isinstance(result, str) and os.path.exists(result):

            with open(result, "rb") as f:
                image_bytes = f.read()

            import base64
            image_base64 = base64.b64encode(image_bytes).decode("utf-8")

            return {"image": image_base64}

        return {"error": "Unexpected API response"}

    except Exception as e:
        return {"error": str(e)}
