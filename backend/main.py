from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import json
import os
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data
TRIPS_PATH = "pune_trips.json"
STATS_PATH = "pune_traffic_stats.csv"

trips_data = []
stats_df = None
model = None

def init_app():
    global trips_data, stats_df, model
    if os.path.exists(TRIPS_PATH):
        with open(TRIPS_PATH, 'r') as f:
            trips_data = json.load(f)
            
    if os.path.exists(STATS_PATH):
        stats_df = pd.read_csv(STATS_PATH)
        # Train a simple regressor for congestion score
        X = stats_df[['hour', 'lat', 'lon']]
        y = stats_df['congestion_score']
        model = RandomForestRegressor(n_estimators=50)
        model.fit(X, y)
        print("Model trained.")

init_app()

@app.get("/traffic/trips")
def get_trips():
    return trips_data

@app.get("/traffic/current")
def get_current_traffic():
    # Simulate "current" based on current second in a 3600s loop for animation
    # and use the current hour for stats
    now = datetime.now()
    current_hour = now.hour
    
    current_stats = stats_df[stats_df['hour'] == current_hour].to_dict(orient="records")
    
    # Add some "live" noise
    for s in current_stats:
        s['volume'] = int(s['volume'] * np.random.uniform(0.9, 1.1))
        s['speed'] = s['speed'] * np.random.uniform(0.95, 1.05)
        s['congestion_score'] = s['volume'] / (s['speed'] + 1)
        
    return {
        "timestamp": now.isoformat(),
        "hour": current_hour,
        "stats": current_stats
    }

@app.get("/traffic/predict")
def predict_traffic(hour: int, lat: float, lon: float):
    if model:
        pred = model.predict([[hour, lat, lon]])[0]
        level = "LOW"
        if pred > 2.5: level = "HIGH"
        elif pred > 1.2: level = "MEDIUM"
        
        return {"hour": hour, "predicted_congestion_score": pred, "level": level}
    return {"error": "Model not ready"}

@app.get("/analytics/summary")
def get_summary():
    if stats_df is not None:
        peak_hour = stats_df.groupby('hour')['volume'].mean().idxmax()
        avg_speed = stats_df['speed'].mean()
        return {
            "peak_hour": int(peak_hour),
            "avg_city_speed": round(avg_speed, 2),
            "status": "Operational"
        }
    return {"error": "No stats"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
