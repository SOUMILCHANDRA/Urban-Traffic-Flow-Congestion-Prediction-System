import json
import random
from datetime import datetime, timedelta
import numpy as np

# Coordinates for major Pune roads (Simplified paths)
ROADS = {
    "Pune-Bangalore Highway": [
        [73.75, 18.59], [73.76, 18.57], [73.77, 18.55], [73.78, 18.53], [73.79, 18.51]
    ],
    "Ganeshkhind Road": [
        [73.81, 18.54], [73.82, 18.53], [73.83, 18.53], [73.84, 18.53], [73.85, 18.53]
    ],
    "Karve Road": [
        [73.81, 18.50], [73.82, 18.50], [73.83, 18.51], [73.84, 18.52], [73.85, 18.53]
    ],
    "Solapur Road": [
        [73.87, 18.51], [73.89, 18.50], [73.91, 18.50], [73.93, 18.49], [73.95, 18.48]
    ],
    "Nagar Road": [
        [73.87, 18.54], [73.89, 18.55], [73.91, 18.56], [73.93, 18.57], [73.95, 18.58]
    ],
    "Airport Road": [
        [73.88, 18.55], [73.89, 18.57], [73.90, 18.58], [73.91, 18.59]
    ]
}

def interpolate_path(path, samples=20):
    interpolated = []
    for i in range(len(path) - 1):
        p1 = np.array(path[i])
        p2 = np.array(path[i+1])
        for s in range(samples):
            interpolated.append(list(p1 + (p2 - p1) * (s / samples)))
    interpolated.append(path[-1])
    return interpolated

def generate_trips(num_trips=200):
    trips = []
    base_time = 0 # Relative seconds in a loop
    
    for _ in range(num_trips):
        road_name = random.choice(list(ROADS.keys()))
        path = ROADS[road_name]
        
        # Add some jitter to paths to make them look like multi-lane traffic
        path = [[coord[0] + random.uniform(-0.0005, 0.0005), coord[1] + random.uniform(-0.0005, 0.0005)] for coord in path]
        
        full_path = interpolate_path(path)
        
        # Start time variation
        start_time = random.uniform(0, 3600) # Within an hour loop
        duration = random.uniform(200, 600)
        
        timestamps = [start_time + (duration * (i / len(full_path))) for i in range(len(full_path))]
        
        # Assign status based on random congestion logic
        congestion_rand = random.random()
        status = "LOW"
        if congestion_rand > 0.8: status = "HIGH"
        elif congestion_rand > 0.5: status = "MEDIUM"
        
        trips.append({
            "path": full_path,
            "timestamps": timestamps,
            "vendor": random.randint(0, 2),
            "status": status
        })
        
    with open("pune_trips.json", "w") as f:
        json.dump(trips, f)
    print("Generated pune_trips.json")

# Also generate a traffic stats file for the prediction/heatmap
def generate_traffic_stats():
    stats = []
    # 24 hours
    for h in range(24):
        # Morning/Evening peaks
        is_peak = (8 <= h <= 11) or (17 <= h <= 20)
        for road in ROADS:
            base_vol = random.randint(20, 100)
            if is_peak: base_vol *= 2.5
            
            # Add stochastic variation
            vol = int(base_vol * random.uniform(0.85, 1.15))
            speed = max(10, 60 - (vol / 10) * random.uniform(0.9, 1.1))
            
            # Pick a center point for the road for the heatmap
            mid_idx = len(ROADS[road]) // 2
            lat, lon = ROADS[road][mid_idx][1], ROADS[road][mid_idx][0]
            
            stats.append({
                "hour": h,
                "road": road,
                "lat": lat,
                "lon": lon,
                "volume": vol,
                "speed": speed,
                "congestion_score": vol / (speed + 1)
            })
            
    import pandas as pd
    df = pd.DataFrame(stats)
    df.to_csv("pune_traffic_stats.csv", index=False)
    print("Generated pune_traffic_stats.csv")

if __name__ == "__main__":
    generate_trips(500)
    generate_traffic_stats()
