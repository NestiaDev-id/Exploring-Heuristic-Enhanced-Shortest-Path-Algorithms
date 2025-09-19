import React, { useState } from 'react';
import { config } from '../config/environment';

const AppInfo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const appVersion = '1.0.0';
  const buildDate = new Date().toISOString().split('T')[0];

  return (
    <div className="app-info">
      <div 
        className="app-info-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>ℹ️ App Information</h4>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </div>
      
      {isExpanded && (
        <div className="app-info-details">
          <div className="info-section">
            <h5>Application</h5>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">Shortest Path Finder</span>
            </div>
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span className="info-value">{appVersion}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Build Date:</span>
              <span className="info-value">{buildDate}</span>
            </div>
          </div>

          <div className="info-section">
            <h5>Configuration</h5>
            <div className="info-item">
              <span className="info-label">API Base URL:</span>
              <span className="info-value">{config.api.baseUrl}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Default Center:</span>
              <span className="info-value">
                {config.map.defaultCenter.lat.toFixed(4)}, {config.map.defaultCenter.lng.toFixed(4)}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Default Zoom:</span>
              <span className="info-value">{config.map.defaultZoom}</span>
            </div>
          </div>

          <div className="info-section">
            <h5>Technologies</h5>
            <div className="tech-list">
              <span className="tech-tag">React 19</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Leaflet.js</span>
              <span className="tech-tag">OpenStreetMap</span>
              <span className="tech-tag">Vite</span>
            </div>
          </div>

          <div className="info-section">
            <h5>Features</h5>
            <ul className="features-list">
              <li>🗺️ Interactive OpenStreetMap</li>
              <li>📍 Marker placement and management</li>
              <li>🔍 Real-time location search</li>
              <li>🛣️ Multiple pathfinding algorithms</li>
              <li>📊 Detailed path information</li>
              <li>📱 Responsive design</li>
              <li>🚀 Quick demo scenarios</li>
            </ul>
          </div>

          <div className="info-section">
            <h5>Algorithms</h5>
            <ul className="algorithms-list">
              <li><strong>Dijkstra:</strong> Classic shortest path algorithm</li>
              <li><strong>A*:</strong> Heuristic-based pathfinding</li>
              <li><strong>Custom:</strong> Backend-specific implementation</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppInfo;
