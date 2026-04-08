import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';
import { Activity, Map as MapIcon, TrendingUp, Clock, Navigation, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [trips, setTrips] = useState([]);
  const [stats, setStats] = useState([]);
  const [summary, setSummary] = useState<any>(null);
  const [time, setTime] = useState(0);
  const [prediction, setPrediction] = useState<any>(null);
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
          axios.get('http://localhost:8001/traffic/trips'),
          axios.get('http://localhost:8001/traffic/current'),
          axios.get('http://localhost:8001/analytics/summary')
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
    try {
      // Mock prediction for Hinjewadi
      const res = await axios.get('http://localhost:8001/traffic/predict?hour=18&lat=18.59&lon=73.71');
      setPrediction(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <MapComponent trips={trips} stats={stats} time={time} />

      {/* Top Left Panel: Status */}
      <div className="panel top-left-panel">
        <h1>GOD'S EYE</h1>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '15px' }}>Pune Traffic Intelligence System</p>
        
        <div className="stat-item">
          <span className="stat-label"><Activity size={14} className="live-indicator" /> System Status</span>
          <span className="stat-value" style={{ color: 'var(--success)' }}>LIVE</span>
        </div>
        <div className="stat-item">
          <span className="stat-label"><MapIcon size={14} /> Active Vehicles</span>
          <span className="stat-value">{trips.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label"><Navigation size={14} /> Avg. Speed</span>
          <span className="stat-value">{summary?.avg_city_speed || '--'} km/h</span>
        </div>
      </div>

      {/* Right Side Panel: Analytics & Prediction */}
      <div className="panel right-side-panel">
        <section>
          <h3><TrendingUp size={18} /> Traffic Insights</h3>
          <div className="stat-item">
            <span className="stat-label">Peak Hour Today</span>
            <span className="stat-value">{summary?.peak_hour}:00</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Congestion Index</span>
            <span className="stat-value" style={{ color: 'var(--warning)' }}>MODERATE</span>
          </div>
        </section>

        <section>
          <h3><ShieldCheck size={18} /> Predictive AI</h3>
          <input 
            type="text" 
            placeholder="Search Area (e.g. Hinjewadi)" 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <button className="btn-primary" onClick={handlePredict}>Predict 18:00</button>
            <button className="btn-primary" style={{ background: 'var(--danger)' }}>Rain Spike</button>
          </div>
          
          {prediction && (
            <div className="prediction-box">
              <p style={{ fontSize: '0.9rem' }}>Prediction for 18:00:</p>
              <h2 style={{ fontSize: '1.2rem', margin: '5px 0' }}>{prediction.level} CONGESTION</h2>
              <div className="confidence-meter">
                 <div className="meter-fill" style={{ width: '89%' }}></div>
              </div>
              <p style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '5px' }}>Confidence: 89% | Stochastic Variance Added</p>
            </div>
          )}
        </section>

        <section>
          <h3><Clock size={18} /> Time Matrix</h3>
          <p style={{ fontSize: '0.8rem', marginBottom: '10px' }}>Simulation Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
          <input type="range" min="0" max="3600" value={time} onChange={(e) => setTime(parseInt(e.target.value))} />
        </section>
      </div>

      {/* Bottom Center: Timeline / Route Optimization */}
      <div className="panel bottom-center-panel">
         <h3>Optimized Routing</h3>
         <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1, borderLeft: '2px solid var(--success)', paddingLeft: '10px' }}>
              <p style={{ fontSize: '0.7rem' }}>FASTEST ROUTE</p>
              <p style={{ fontWeight: 'bold' }}>Via Pashan Road</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--success)' }}>24 mins (-8 mins)</p>
            </div>
            <div style={{ flex: 1, borderLeft: '2px solid var(--primary)', paddingLeft: '10px' }}>
              <p style={{ fontSize: '0.7rem' }}>ALTERNATIVE</p>
              <p style={{ fontWeight: 'bold' }}>Via University Circle</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>32 mins</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default App;
