import React from 'react';

interface PathInfoProps {
  path: Array<[number, number]>;
  algorithm: string;
  distance?: number;
  duration?: number;
  nodesVisited?: number;
  executionTime?: number;
}

const PathInfo: React.FC<PathInfoProps> = ({
  path,
  algorithm,
  distance,
  duration,
  nodesVisited,
  executionTime
}) => {
  if (path.length === 0) {
    return null;
  }

  const formatDistance = (dist?: number) => {
    if (!dist) return 'N/A';
    if (dist < 1000) return `${dist.toFixed(0)} m`;
    return `${(dist / 1000).toFixed(2)} km`;
  };

  const formatDuration = (dur?: number) => {
    if (!dur) return 'N/A';
    if (dur < 60) return `${dur.toFixed(0)} seconds`;
    return `${(dur / 60).toFixed(1)} minutes`;
  };

  const formatTime = (time?: number) => {
    if (!time) return 'N/A';
    return `${time.toFixed(3)} ms`;
  };

  return (
    <div className="path-info">
      <h3>Path Information</h3>
      
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Algorithm:</span>
          <span className="info-value">{algorithm}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Distance:</span>
          <span className="info-value">{formatDistance(distance)}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Duration:</span>
          <span className="info-value">{formatDuration(duration)}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Nodes Visited:</span>
          <span className="info-value">{nodesVisited || 'N/A'}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Execution Time:</span>
          <span className="info-value">{formatTime(executionTime)}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Path Points:</span>
          <span className="info-value">{path.length}</span>
        </div>
      </div>

      <div className="path-summary">
        <h4>Path Summary</h4>
        <p>
          Found optimal path using <strong>{algorithm}</strong> algorithm 
          {distance && ` covering ${formatDistance(distance)}`}
          {executionTime && ` in ${formatTime(executionTime)}`}.
        </p>
      </div>
    </div>
  );
};

export default PathInfo;
