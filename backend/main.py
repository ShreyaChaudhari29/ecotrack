import os
from groq import Groq
from dotenv import load_dotenv
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health():
    return {"status": "EcoTrack backend is running!"}

@app.post("/detect-activity")
def detect_activity(data: dict):
    steps_per_min = data.get("steps", 0) / max(data.get("duration_mins", 1), 1)
    accel = data.get("accel_variance", 0)
    hr = data.get("heart_rate", 70)

    if steps_per_min < 5 and accel > 0.02 and hr < 90:
        mode = "vehicle"
        co2_kg = round(data.get("distance_km", 1) * 0.21, 3)
    elif steps_per_min > 80:
        mode = "walking"
        co2_kg = 0
    else:
        mode = "stationary"
        co2_kg = 0

    return {"mode": mode, "co2_kg": co2_kg}
@app.post("/get-suggestion")
def get_suggestion(data: dict):
    co2 = data.get("today_co2", 0)
    mode = data.get("mode", "vehicle")
    prompt = f"The user travelled by {mode} today and emitted {co2} kg CO2. Give ONE short eco-friendly tip to reduce their carbon footprint tomorrow. Max 2 sentences."
    res = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=100
    )
    return {"tip": res.choices[0].message.content}