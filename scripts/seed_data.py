import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta
import random

cred = credentials.Certificate("../backend/firebase-key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

user_id = "demo_user_001"

activities = [
    {"mode": "vehicle", "distance_km": 8},
    {"mode": "walking", "distance_km": 1.2},
    {"mode": "walking", "distance_km": 2.0},
    {"mode": "vehicle", "distance_km": 5},
    {"mode": "cycling", "distance_km": 3},
    {"mode": "walking", "distance_km": 1.5},
    {"mode": "vehicle", "distance_km": 6},
]

tips = [
    "Try taking the metro tomorrow to save CO₂!",
    "Great job walking today — keep it up!",
    "Cycling is amazing — you saved 0.3kg CO₂ today!",
    "Consider carpooling tomorrow to reduce emissions.",
    "You're on a 3 day streak — amazing work!",
    "Walking 2km saved the equivalent of 1 tree today!",
    "Public transport can cut your emissions by 70%!",
]

print("Seeding 7 days of demo data...")

for i, activity in enumerate(activities):
    co2 = round(activity["distance_km"] * 0.21, 2) if activity["mode"] == "vehicle" else 0
    date = datetime.now() - timedelta(days=7-i)
    
    db.collection("activity_logs").add({
        "userId": user_id,
        "mode": activity["mode"],
        "co2_kg": co2,
        "distance_km": activity["distance_km"],
        "timestamp": date,
        "aiSuggestion": tips[i]
    })
    print(f"✅ Day {i+1}: {activity['mode']} → {co2} kg CO₂")

print("\n🌿 Done! 7 days of data seeded successfully!")