# 🌍 God's Eye: Traffic Intelligence System

![God's Eye Traffic Intelligence](https://img.shields.io/badge/Status-Live%20Simulation-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20FastAPI%20%7C%20Deck.gl%20%7C%20ML-blue)

**God's Eye** is a satellite-view urban traffic intelligence dashboard designed for Pune City. It provides a top-down, real-time-like visualization of traffic flow, predictive congestion modeling, and smart route optimization.

## ✨ Key Features

- **🛸 God's Eye View**: Immersive satellite-style dark map visualization using Mapbox GL.
- **🚗 Live-Like Animated Flow**: Uses `Deck.gl TripsLayer` to animate moving particles representing vehicles on Pune's major roads.
- **🔥 Congestion Heatmap**: Dynamic heatmap overlay that identifies volume density and hotspots.
- **🧠 Predictive AI**: Machine Learning (Random Forest) models that predict future traffic levels based on time, day, and location.
- **🛰️ Time Matrix**: Interactive time slider allowing users to scrub through past, present, and predicted future traffic states.
- **🛣️ Route Optimization**: Real-time suggestions for the fastest vs. least congested routes.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Deck.gl, Mapbox GL JS, Framer Motion, Lucide Icons.
- **Backend**: Python, FastAPI, Pandas, Scikit-learn (Random Forest).
- **Data**: Simulated streaming pipeline using historical Pune traffic patterns with stochastic variation.

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- Mapbox Access Token (Add to `frontend/.env`)

### 2. Backend Setup
```bash
cd backend
py -m pip install -r requirements.txt
py main.py
```
*The API will be available at `http://localhost:8001`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The Dashboard will be available at `http://localhost:5173`*

## 🔮 Prediction Logic
The system uses a **Congestion Score** formula:
`Score = Traffic Volume / (Avg Speed + 1)`

Predictions are classified into **LOW**, **MEDIUM**, and **HIGH** using a trained Random Forest Regressor, providing city-scale intelligence for urban planning and personal travel.

## 🏁 Final Deliverables
- [x] Interactive 3D Web Dashboard
- [x] Animated Traffic Simulation
- [x] ML Prediction System
- [x] Route Recommendation Engine

---
Built with ❤️ by SOUMIL CHANDRA & Antigravity AI
