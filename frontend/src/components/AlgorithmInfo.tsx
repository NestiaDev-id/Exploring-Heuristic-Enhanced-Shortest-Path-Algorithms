import React, { useState } from 'react';
import { algorithmInfo, sampleRoutes } from './DemoData';

interface AlgorithmInfoProps {
  selectedAlgorithm: string;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ selectedAlgorithm }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentAlgorithm = sampleRoutes[selectedAlgorithm as keyof typeof sampleRoutes];
  const currentInfo = algorithmInfo[selectedAlgorithm as keyof typeof algorithmInfo];

  if (!currentAlgorithm || !currentInfo) {
    return null;
  }

  return (
    <div className="algorithm-info">
      <div 
        className="algorithm-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4>📚 {currentAlgorithm.name}</h4>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </div>
      
      {isExpanded && (
        <div className="algorithm-details">
          <div className="algorithm-description">
            <p>{currentAlgorithm.description}</p>
          </div>
          
          <div className="algorithm-specs">
            <div className="spec-item">
              <span className="spec-label">Complexity:</span>
              <span className="spec-value">{currentAlgorithm.complexity}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Use Case:</span>
              <span className="spec-value">{currentAlgorithm.useCase}</span>
            </div>
          </div>
          
          <div className="pros-cons">
            <div className="pros">
              <h5>✅ Advantages</h5>
              <ul>
                {currentInfo.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
            
            <div className="cons">
              <h5>❌ Disadvantages</h5>
              <ul>
                {currentInfo.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmInfo;
