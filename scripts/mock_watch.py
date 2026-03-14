import requests
import time
import random

BACKEND = "http://127.0.0.1:8000"

scenarios = [
    {"steps": 2, "duration_mins": 20, "accel_variance": 0.03,
     "heart_rate": 75, "distance_km": 8, "label": "🚗 Vehicle trip"},
    {"steps": 95, "duration_mins": 15, "accel_variance": 0.8,
     "heart_rate": 105, "distance_km": 1.2, "label": "🚶 Walking"},
    {"steps": 0, "duration_mins": 60, "accel_variance": 0.005,
     "heart_rate": 65, "distance_km": 0, "label": "🪑 Sitting"},
    {"steps": 60, "duration_mins": 20, "accel_variance": 0.6,
     "heart_rate": 90, "distance_km": 3, "label": "🚴 Cycling"},
]

print("⌚ Mock watch simulator started!")
print("Sending data to backend every 10 seconds...\n")

while True:
    s = random.choice(scenarios)
    print(f"Simulating: {s['label']}")
    try:
        res = requests.post(f"{BACKEND}/detect-activity", json=s)
        data = res.json()
        print(f"→ Detected: {data['mode']} | CO₂: {data['co2_kg']} kg")
    except:
        print("→ Backend not reachable — is it running?")
    print()
    time.sleep(10)