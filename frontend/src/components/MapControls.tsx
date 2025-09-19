import React from 'react';
import AlgorithmInfo from './AlgorithmInfo';

interface MapControlsProps {
  onAddMarker: () => void;
  onClearMarkers: () => void;
  onFindPath: () => void;
  onAlgorithmChange: (algorithm: string) => void;
  markerCount: number;
  selectedAlgorithm: string;
  isLoading: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({
  onAddMarker,
  onClearMarkers,
  onFindPath,
  onAlgorithmChange,
  markerCount,
  selectedAlgorithm,
  isLoading
}) => {
  const algorithms = [
    { value: 'dijkstra', label: 'Dijkstra' },
    { value: 'astar', label: 'A* (A-Star)' },
    { value: 'custom', label: 'Custom Algorithm' }
  ];

  return (
    <div className="map-controls">
      <div className="control-section">
        <h3>Map Controls</h3>
        
        <div className="button-group">
          <button 
            onClick={onAddMarker}
            className="control-btn add-marker-btn"
            title="Click on map to add marker"
          >
            📍 Add Marker
          </button>
          
          <button 
            onClick={onClearMarkers}
            className="control-btn clear-btn"
            disabled={markerCount === 0}
          >
            🗑️ Clear All
          </button>
        </div>
        
        <div className="marker-info">
          <span>Markers: {markerCount}</span>
        </div>
      </div>

      <div className="control-section">
        <h3>Algorithm Selection</h3>
        
        <div className="algorithm-selector">
          {algorithms.map((algo) => (
            <label key={algo.value} className="algorithm-option">
              <input
                type="radio"
                name="algorithm"
                value={algo.value}
                checked={selectedAlgorithm === algo.value}
                onChange={(e) => onAlgorithmChange(e.target.value)}
              />
              <span>{algo.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="control-section">
        <button 
          onClick={onFindPath}
          className="control-btn find-path-btn"
          disabled={markerCount < 2 || isLoading}
        >
          {isLoading ? '🔄 Calculating...' : '🛣️ Find Shortest Path'}
        </button>
        
        {markerCount < 2 && (
          <p className="help-text">Add at least 2 markers to find a path</p>
        )}
      </div>

      <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
    </div>
  );
};

export default MapControls;
