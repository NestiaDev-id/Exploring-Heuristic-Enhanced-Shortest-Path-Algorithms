import React, { useState, useRef, useEffect } from 'react';
import { config } from '../config/environment';

interface LocationSearchProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  onAddToMap: (lat: number, lng: number, address: string) => void;
}

interface SearchResult {
  lat: string;
  lng: string;
  display_name: string;
  place_id: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  onAddToMap
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchLocation = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using Nominatim API for geocoding
      const response = await fetch(
        `${config.search.nominatimUrl}/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=${config.search.maxResults}&addressdetails=1`
      );
      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching location:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchLocation(value);
    }, config.search.debounceMs);

    return () => clearTimeout(timeoutId);
  };

  const handleResultClick = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lng);
    
    onLocationSelect(lat, lng, result.display_name);
    setQuery(result.display_name);
    setShowResults(false);
  };

  const handleAddToMap = (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lng);
    
    onAddToMap(lat, lng, result.display_name);
    setQuery(result.display_name);
    setShowResults(false);
  };

  return (
    <div className="location-search" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a location..."
          className="search-input"
        />
        {isLoading && <div className="loading-spinner">🔄</div>}
      </div>

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((result) => (
            <div key={result.place_id} className="search-result-item">
              <div 
                className="result-content"
                onClick={() => handleResultClick(result)}
              >
                <div className="result-name">{result.display_name}</div>
                <div className="result-coords">
                  {parseFloat(result.lat).toFixed(6)}, {parseFloat(result.lng).toFixed(6)}
                </div>
              </div>
              <button 
                className="add-to-map-btn"
                onClick={() => handleAddToMap(result)}
                title="Add to map"
              >
                📍
              </button>
            </div>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !isLoading && query && (
        <div className="no-results">
          No locations found for "{query}"
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
