import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';
import { Activity, Map as MapIcon, TrendingUp, Clock, Navigation, ShieldCheck } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const App: React.FC = () => {
  const [trips, setTrips] = useState([]);
  const [stats, setStats] = useState([]);
  const [summary, setSummary] = useState<any>(null);
  const [time, setTime] = useState(0);
  const [prediction, setPrediction] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => (t + 2) % 3600);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripsRes, currentRes, summaryRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/traffic/trips`),
          axios.get(`${API_BASE_URL}/traffic/current`),
          axios.get(`${API_BASE_URL}/analytics/summary`)
        ]);
        setTrips(tripsRes.data);
        setStats(currentRes.data.stats);
        setSummary(summaryRes.data);
      } catch (err) {
        console.error("Backend connection failed", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Update stats every 5s
    return () => clearInterval(interval);
  }, []);

  const handlePredict = async () => {
    setIsSearching(true);
    setPrediction(null);
    try {
      // Mock prediction for Hinjewadi
      const res = await axios.get(`${API_BASE_URL}/traffic/predict?hour=18&lat=18.59&lon=73.71`);
      // Artificial delay for 'Scan' effect
      setTimeout(() => {
        setPrediction(res.data);
        setIsSearching(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsSearching(false);
      alert("Neural Link Offline: Check Backend Connection");
    }
  };

  return (
    <div className="dashboard-container">
      <MapComponent trips={trips} stats={stats} time={time} />
      
      {/* Cyber HUD Overlay */}
      <div className="hud-overlay"></div>

      {/* Top Left Panel: Status */}
      <div className="panel top-left-panel">
        <div className="brand">
          <ShieldCheck className="brand-icon" size={24} />
          <div>
            <h1>GOD'S EYE</h1>
            <p className="subtitle">TRANSIT INTELLIGENCE CORE</p>
          </div>
        </div>
        
        <div className="stat-grid">
          <div className="stat-item">
            <span className="stat-label"><Activity size={14} className="live-indicator" /> SYSTEM</span>
            <span className="stat-status">ACTIVE</span>
          </div>
          <div className="stat-item">
            <span className="stat-label"><Navigation size={14} /> VEHICLES</span>
            <span className="stat-value">{trips.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label"><TrendingUp size={14} /> AVG FLOW</span>
            <span className="stat-value">{summary?.avg_city_speed || '--'} km/h</span>
          </div>
        </div>
      </div>

      {/* Right Side Panel: Analytics & Prediction */}
      <div className="panel right-side-panel">
        <section>
          <div className="section-header">
            <TrendingUp size={18} />
            <h3>Real-time Analytics</h3>
          </div>
          <div className="analytics-card">
            <div className="stat-pair">
              <span className="label">CONGESTION INDEX</span>
              <span className="value" style={{ color: 'var(--warning)' }}>48.2%</span>
            </div>
            <div className="stat-pair">
              <span className="label">PEAK HOURS (EST)</span>
              <span className="value">{summary?.peak_hour}:00</span>
            </div>
          </div>
        </section>

        <section className="predictive-section">
          <div className="section-header">
            <ShieldCheck size={18} />
            <h3>Neural Predictor</h3>
          </div>
          <p className="helper-text">Scan municipal sectors for future bottlenecks.</p>
          <div className="search-group">
            <input 
              type="text" 
              placeholder="SEARCH SECTOR (e.g. HINJEWADI)" 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="action-buttons">
              <button 
                className="btn-primary" 
                onClick={handlePredict}
                disabled={isSearching}
              >
                {isSearching ? 'SCANNING...' : 'SCAN FUTURE (18:00)'}
              </button>
              <button className="btn-danger" onClick={() => alert('Anomaly simulations active')}>SIMULATE RAIN</button>
            </div>
          </div>
          
          {isSearching && <div className="scanning-line"></div>}
          
          {prediction && (
            <div className="prediction-box animate-slide-in">
              <div className="prediction-header">
                <span className="tag">PREDICTION RESULT</span>
                <span className="confidence">CONFIDENCE: 92.4%</span>
              </div>
              <h2 className={prediction.level.toLowerCase()}>{prediction.level} CONGESTION</h2>
              <div className="prediction-details">
                <p>IMPACT: Significant delays expected in Sector 4. Recommending proactive diversion.</p>
              </div>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '92%' }}></div>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="section-header">
            <Clock size={18} />
            <h3>Temporal Matrix</h3>
          </div>
          <div className="time-display">
            <span className="digital-clock">T-{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span>
            <span className="date">08 APR 2026</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="3600" 
            value={time} 
            onChange={(e) => setTime(parseInt(e.target.value))} 
            className="cyan-range"
          />
        </section>
      </div>

      {/* Bottom Center: Timeline / Route Optimization */}
      <div className="panel bottom-center-panel">
         <div className="route-header">
           <h3>DYNAMIC DIVERSION ENGINE</h3>
           <span className="badge">OPTIMIZING</span>
         </div>
         <div className="route-grid">
            <div className="route-card active">
              <div className="route-info">
                <span className="route-label">PRIMARY DIVERSION</span>
                <span className="route-name">VIA PASHAN ROAD</span>
              </div>
              <span className="route-delta">-8 MINS</span>
            </div>
            <div className="route-card">
              <div className="route-info">
                <span className="route-label">ALTERNATIVE</span>
                <span className="route-name">VIA UNIVERSITY CIRCLE</span>
              </div>
              <span className="route-delta">+14 MINS</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default App;
