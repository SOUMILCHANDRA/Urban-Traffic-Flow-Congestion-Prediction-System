# 👁️ GOD'S EYE | TRANSIT INTELLIGENCE CORE

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

## 🚀 Deployment & Monorepo Architecture

The **God's Eye** platform is designed as a unified monorepo for seamless deployment.

### ⚙️ Unified Service Flow
1.  **Orchestration**: A root `package.json` manages both frontend and backend pipelines.
2.  **Build Phase**: The React frontend is compiled into optimized static assets.
3.  **Deployment**: Railway builds the service using **Nixpacks**.
4.  **Runtime**: The FastAPI backend serves the React SPA from `/static` and handles ML-driven API requests on the same port.

> [!TIP]
> **Technical Interview Pro-Tip:**
> "The system is deployed as a unified full-stack service, where the FastAPI backend serves both the machine learning API and the frontend interface, eliminating cross-origin overhead and simplifying deployment."

### 🌐 Live Setup (Railway)
1.  Connect your GitHub repository to **Railway**.
2.  Railway will automatically detect the root `package.json` and `railway.json`.
3.  The build script will compile the frontend and stage it for the backend.
4.  Accessed via a single unified URL.

---

### 📡 Data Source
Simulated via a stochastic urban mobility generator, mirroring Pune's topology and traffic density patterns. No API keys required.

---
**OPERATIONAL STATUS: READY**
*Developed by SOUMIL CHANDRA & Antigravity AI*
