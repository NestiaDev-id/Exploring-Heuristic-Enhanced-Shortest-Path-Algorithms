import React from 'react';
import { demoLocations, generateDemoMarkers } from './DemoData';

interface DemoPanelProps {
  onAddMarkers: (markers: Array<{ lat: number; lng: number; label?: string }>) => void;
  onClearMarkers: () => void;
}

const DemoPanel: React.FC<DemoPanelProps> = ({ onAddMarkers, onClearMarkers }) => {
  const handleQuickDemo = (count: number) => {
    const demoMarkers = generateDemoMarkers(count);
    onAddMarkers(demoMarkers);
  };

  const handleLocationDemo = (location: typeof demoLocations[0]) => {
    onAddMarkers([{
      lat: location.lat,
      lng: location.lng,
      label: location.name
    }]);
  };

  return (
    <div className="demo-panel">
      <h3>🚀 Quick Demo</h3>
      
      <div className="demo-section">
        <h4>Quick Routes</h4>
        <div className="demo-buttons">
          <button 
            onClick={() => handleQuickDemo(2)}
            className="demo-btn"
          >
            🏁 Start → End
          </button>
          <button 
            onClick={() => handleQuickDemo(3)}
            className="demo-btn"
          >
            🛣️ With Waypoint
          </button>
          <button 
            onClick={() => handleQuickDemo(4)}
            className="demo-btn"
          >
            🔄 Complex Route
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h4>Popular Locations</h4>
        <div className="location-list">
          {demoLocations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationDemo(location)}
              className="location-btn"
              title={location.description}
            >
              <span className="location-name">{location.name}</span>
              <span className="location-desc">{location.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="demo-section">
        <button 
          onClick={onClearMarkers}
          className="clear-demo-btn"
        >
          🗑️ Clear All Markers
        </button>
      </div>
    </div>
  );
};

export default DemoPanel;
