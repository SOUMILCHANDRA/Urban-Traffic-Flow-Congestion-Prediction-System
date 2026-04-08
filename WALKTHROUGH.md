# Walkthrough: God's Eye Traffic Intelligence System

The God's Eye project is a high-fidelity urban traffic monitoring and prediction dashboard for Pune, India. It combines historical traffic patterns with real-time simulation and ML-based intelligence.

## 🚀 System Architecture

### 1. Backend (FastAPI + ML)
- **Data Replay Simulation**: Developed a "Time Playback" mechanism in `main.py` that streams historical traffic data (with ±15% stochastic noise) to mimic a live environment.
- **Congestion Prediction**: A Random Forest regressor predicts congestion scores based on the hour of the day and specific road coordinates.
- **Trip Generation**: A custom script (`generate_data.py`) creates complex vehicle paths mapped to Pune's major roads (Hinjewadi, Ganeshkhind, Karve Rd, etc.) for high-quality animation.

### 2. Frontend (React + Deck.gl + Mapbox)
- **God's Eye View**: A full-screen Mapbox satellite base layer providing the "Control Room" aesthetic.
- **TripsLayer Animation**: Animates vehicle "particles" moving along road networks. Speed and density are driven by the backend simulator.
- **Heatmap Overlay**: Aggregates traffic volume into visual hotspots.
- **Predictive Dashboard**: Floating UI panels built with modern glassmorphism.

## 🛠️ How to Run

### Backend
```bash
cd backend
py -m pip install -r requirements.txt
py main.py
```
*Backend runs on `http://localhost:8001`*

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---
**GitHub Repository**: [Urban-Traffic-Flow-Congestion-Prediction-System](https://github.com/SOUMILCHANDRA/Urban-Traffic-Flow-Congestion-Prediction-System.git)
