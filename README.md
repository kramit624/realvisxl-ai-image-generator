# 🎨 RealVisXL AI Image Generator (Full-Stack GenAI Project)

A full-stack **Text-to-Image AI Generator** built using a **Diffusion Model (RealVisXL)**, deployed via **HuggingFace Spaces**, with a **FastAPI backend** and a **React + Vite frontend UI**.

This project demonstrates **end-to-end Generative AI deployment** without using any local GPU — everything runs on **CPU inference via HuggingFace**.

---

## 🚀 Live Project Architecture

Frontend (React + Vite)  
→ Backend API (FastAPI)  
→ HuggingFace Space (Diffusion Model - CPU)  
→ Image Generated & Returned to UI

---

## ✨ Features

✅ Text-to-Image Generation using Diffusion Model  
✅ RealVisXL (SDXL-based) High-Quality Model  
✅ CPU-Only Inference (No GPU Required)  
✅ Live Image Generation via API  
✅ Full-Screen Modern UI  
✅ Countdown Timer (Generation Progress)  
✅ Image Download Button  
✅ Error Handling  
✅ Fully Deployable on Free Servers  

---

## 🧠 Technologies Used

### 🔹 AI / ML
- Stable Diffusion XL (SDXL)
- RealVisXL Model
- Diffusers
- HuggingFace Spaces (CPU Inference)

### 🔹 Backend
- FastAPI
- Python
- Gradio Client
- REST API

### 🔹 Frontend
- React.js
- Vite
- CSS (Custom Dark UI)
- Fetch API

### 🔹 Deployment
- HuggingFace (Model Hosting)
- Vercel (Frontend - Free)
- Render / Railway (Backend - Free)

---

## ⚠️ Important Note (CPU Limitation)

This project currently runs on **CPU inference only** because:

- I do not have access to a local GPU  
- Free HuggingFace tier provides CPU-only hosting  

⏳ **Image generation may take 2–5 minutes per request**, which is expected behavior for SDXL models on CPU.

---

## 🖥️ Project Structure

Text_to_Image/
├── Frontend/ (React + Vite)
├── Backend/ (FastAPI)
└── README.md

---

## 🔌 Backend API Endpoint

---


### Request Body:
* POST /generate

```json
{
  "prompt": "a hyper realistic 4k photo of a monkey using a smartphone"
}

```

---

* Response:
```
{
  "image": "base64_encoded_image"
}
```

---

### Backend Setup

cd Backend

pip install -r requirements.txt

uvicorn main:app --reload --port 8000

---

### Frontend Setup

npm install

npm run dev

---

- OPEN :- http://localhost:5173

---

- 🔗 HuggingFace Model:
https://huggingface.co/kramit624/realvisxl-v4-amit

---
