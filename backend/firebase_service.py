import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

if not firebase_admin._apps:
    cred_json = os.getenv("FIREBASE_CREDENTIALS")
    if cred_json:
        try:
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
        except:
            cred = credentials.Certificate("firebase-key.json")
    else:
        cred = credentials.Certificate("firebase-key.json")
    firebase_admin.initialize_app(cred)

db = firestore.client()

def save_activity(user_id, mode, co2_kg):
    db.collection("activity_logs").add({
        "userId": user_id,
        "mode": mode,
        "co2_kg": co2_kg,
        "timestamp": firestore.SERVER_TIMESTAMP
    })
    return True