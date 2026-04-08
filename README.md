# 👁️ GOD'S EYE | TRANSIT INTELLIGENCE CORE

**Live Dashboard:** [trafficeye-pulse-matrix.onrender.com](https://trafficeye-pulse-matrix.onrender.com/)

![God's Eye Dashboard](./dashboard.png)

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

## 🚀 Deployment Strategy (Render)

The **God's Eye** platform is optimized for deployment on **Render's Free Tier** using a distributed full-stack architecture.

### ⚙️ Multi-Service Structure
1.  **Neural Backend**: Hosted as a **Render Web Service** (FastAPI).
2.  **Control Interface**: Hosted as a **Render Static Site** (React/Vite).

### 🌐 Live Configuration
- **Backend URL**: Set as `VITE_API_URL` environment variable in the Static Site settings.
- **Auto-Sync**: Push to `main` to trigger automated builds for both services.

> [!NOTE]
> **Performance Disclosure:**
> Successfully deployed using Render’s free tier. Note that the free "Web Service" may experience a short delay during first load (cold start) after periods of inactivity. This is expected behavior for free-tier infrastructure but is more than functional for portfolio demonstrations.

> [!TIP]
> **Technical Interview Pro-Tip:**
> "The system utilizes a decoupled architecture where the high-performance visualization layer is served via an optimized Static Site, while the heavy-lifting ML inference is handled by a separate FastAPI microservice. This ensures the dashboard remains responsive even during complex backend computations."

---

### 📡 Data Source
Simulated via a stochastic urban mobility generator, mirroring Pune's topology and traffic density patterns. No API keys required.

---
**OPERATIONAL STATUS: READY**
*Developed by SOUMIL CHANDRA *
