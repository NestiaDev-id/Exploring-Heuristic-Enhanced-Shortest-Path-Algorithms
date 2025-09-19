import React, { useState, useCallback } from 'react';
import Map from './Map';
import MapControls from './MapControls';
import LocationSearch from './LocationSearch';
import PathInfo from './PathInfo';
import DemoPanel from './DemoPanel';
import AppInfo from './AppInfo';
import { config } from '../config/environment';
import { logApiCall, logApiResponse, errorLog } from '../utils/logger';

interface MarkerData {
  lat: number;
  lng: number;
  label?: string;
}

interface PathResult {
  path: Array<[number, number]>;
  distance?: number;
  duration?: number;
  nodesVisited?: number;
  executionTime?: number;
}

const ShortestPathApp: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [route, setRoute] = useState<Array<[number, number]>>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [isLoading, setIsLoading] = useState(false);
  const [pathResult, setPathResult] = useState<PathResult | null>(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);

  const addMarker = useCallback((lat: number, lng: number, label?: string) => {
    const newMarker: MarkerData = {
      lat,
      lng,
      label: label || `Marker ${markers.length + 1}`
    };
    setMarkers(prev => [...prev, newMarker]);
  }, [markers.length]);

  const removeMarker = useCallback((index: number) => {
    setMarkers(prev => prev.filter((_, i) => i !== index));
    // Clear route if markers are removed
    if (route.length > 0) {
      setRoute([]);
      setPathResult(null);
    }
  }, [route.length]);

  const clearAllMarkers = useCallback(() => {
    setMarkers([]);
    setRoute([]);
    setPathResult(null);
  }, []);

  const addMultipleMarkers = useCallback((newMarkers: Array<{ lat: number; lng: number; label?: string }>) => {
    setMarkers(newMarkers);
    // Clear existing route when adding new markers
    setRoute([]);
    setPathResult(null);
  }, []);

  const handleLocationSelect = useCallback((lat: number, lng: number, address: string) => {
    // Center map on selected location
    // This would require map ref, but for now just add as marker
    addMarker(lat, lng, address);
  }, [addMarker]);

  const handleAddToMap = useCallback((lat: number, lng: number, address: string) => {
    addMarker(lat, lng, address);
  }, [addMarker]);

  const findShortestPath = useCallback(async () => {
    if (markers.length < 2) return;

    setIsLoading(true);
    setRoute([]);
    setPathResult(null);

    try {
      // Prepare request data
      const requestData = {
        start: { lat: markers[0].lat, lng: markers[0].lng },
        end: { lat: markers[markers.length - 1].lat, lng: markers[markers.length - 1].lng },
        algorithm: selectedAlgorithm,
        waypoints: markers.slice(1, -1).map(m => ({ lat: m.lat, lng: m.lng }))
      };

      // Call backend API
      const url = `${config.api.baseUrl}${config.api.endpoints.path}`;
      logApiCall(url, 'POST', requestData);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      logApiResponse(url, response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Convert path to format expected by map
      const pathCoords: Array<[number, number]> = result.path?.map((point: any) => 
        [point.lat || point[0], point.lng || point[1]]
      ) || [];

      setRoute(pathCoords);
      setPathResult({
        path: pathCoords,
        distance: result.distance,
        duration: result.duration,
        nodesVisited: result.nodes_visited,
        executionTime: result.execution_time
      });

    } catch (error) {
      errorLog('Error finding path:', error);
      alert('Error finding path. Please check if the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  }, [markers, selectedAlgorithm]);

  const handleAddMarkerClick = useCallback(() => {
    setIsAddingMarker(true);
  }, []);

  const handleMarkerAdd = useCallback((lat: number, lng: number) => {
    addMarker(lat, lng);
    setIsAddingMarker(false);
  }, [addMarker]);

  return (
    <div className="shortest-path-app">
      <header className="app-header">
        <h1>🗺️ Shortest Path Finder</h1>
        <p>Find optimal routes using different pathfinding algorithms</p>
      </header>

      <div className="app-content">
        <div className="sidebar">
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            onAddToMap={handleAddToMap}
          />
          
          <DemoPanel
            onAddMarkers={addMultipleMarkers}
            onClearMarkers={clearAllMarkers}
          />
          
          <MapControls
            onAddMarker={handleAddMarkerClick}
            onClearMarkers={clearAllMarkers}
            onFindPath={findShortestPath}
            onAlgorithmChange={setSelectedAlgorithm}
            markerCount={markers.length}
            selectedAlgorithm={selectedAlgorithm}
            isLoading={isLoading}
          />

          {pathResult && (
            <PathInfo
              path={pathResult.path}
              algorithm={selectedAlgorithm}
              distance={pathResult.distance}
              duration={pathResult.duration}
              nodesVisited={pathResult.nodesVisited}
              executionTime={pathResult.executionTime}
            />
          )}

          <AppInfo />
        </div>

        <div className="map-section">
          <Map
            markers={markers}
            route={route}
            onMarkerAdd={isAddingMarker ? handleMarkerAdd : undefined}
            onMarkerRemove={removeMarker}
            center={markers.length > 0 ? [markers[0].lat, markers[0].lng] : [config.map.defaultCenter.lat, config.map.defaultCenter.lng]}
            zoom={markers.length > 0 ? 15 : config.map.defaultZoom}
          />
        </div>
      </div>

      {isAddingMarker && (
        <div className="adding-marker-overlay">
          <p>Click on the map to add a marker</p>
          <button onClick={() => setIsAddingMarker(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ShortestPathApp;
