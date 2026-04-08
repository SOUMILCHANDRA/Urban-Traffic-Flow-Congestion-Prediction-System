# 👁️ GOD'S EYE | TRANSIT INTELLIGENCE CORE

![Status](https://img.shields.io/badge/Neural--Link-Active-00f2ff)
![Tech Stack](https://img.shields.io/badge/Engine-MapLibre%20%7C%20Deck.gl-ff0055)
![Platform](https://img.shields.io/badge/Control--Room-v2.0-blueviolet)

**God's Eye** is a high-performance, cyber-aesthetic traffic visualization and predictive intelligence suite. Built for the Pune metropolitan region, it provides a "Mission Control" experience for urban flow analysis, leveraging GPU-accelerated rendering and machine learning.

---

## 🌌 The Vision
Transforming raw traffic data into actionable spatial intelligence. God's Eye uses a tech-noir aesthetic combined with professional-grade data layers to visualize the heartbeat of the city.

### 🚀 Core Intelligence
- **🦾 Cyber HUD Interface**: A custom-built mission control dashboard using glassmorphism, scanline overlays, and neon neon-glow accents.
- **🛸 Neural Predictor**: Real-time traffic forecasting using a **Random Forest Regressor** to scan municipal sectors for future bottlenecks.
- **🔥 Kinetic Flow Visualization**: High-performance `TripsLayer` rendering with additive blending for soul-like neon vehicle trails.
- **🛰️ Temporal Matrix**: Scrub through time using a unified temporal slider to see past trends and future AI-generated projections.
- **🔀 Dynamic Diversion Engine**: Real-time logic for calculating delta values between primary and alternative transit routes.

---

## 🛠️ Technical Architecture

- **Map Engine**: **MapLibre GL** (Token-free, open-source high-performance rendering).
- **Visualization**: **Deck.gl v9** (GPU-accelerated layers for millions of data points).
- **Frontend**: React (Vite 8.0), Framer Motion (Adaptive animations), Lucide (HUD icons).
- **Backend**: FastAPI (Python 3.10+), Scikit-Learn (Predictive models), Pandas (Data pipelines).

---

## 🔋 Deployment

### 1. Neural Backend (Intelligence)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*Port: `8002` | Endpoint: `/traffic/predict`*

### 2. Control Interface (Frontend)
```bash
cd frontend
npm install
npm run dev
```
*Port: `5181` | Engine: MapLibre GL*

---

## 🔮 Prediction Logic
The system evaluates the **Congestion Matrix** using:
$$Score = \frac{Volume \times Complexity}{AvgSpeed + (RainFactor \times 0.5)}$$

Predictions are categorized into **LOW**, **MEDIUM**, and **HIGH** alert states, displayed via the interactive Neural Predictor box in the HUD.

---

### 📡 Data Source
Simulated via a stochastic urban mobility generator, mirroring Pune's topology and traffic density patterns. No API keys required.

---
**OPERATIONAL STATUS: READY**
*Developed by SOUMIL CHANDRA & Antigravity AI*
