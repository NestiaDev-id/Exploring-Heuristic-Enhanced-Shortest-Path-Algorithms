import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { config } from '../config/environment';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  onMarkerAdd?: (lat: number, lng: number) => void;
  onMarkerRemove?: (index: number) => void;
  markers?: Array<{ lat: number; lng: number; label?: string }>;
  route?: Array<[number, number]>;
  center?: [number, number];
  zoom?: number;
}

interface MarkerData {
  lat: number;
  lng: number;
  label?: string;
}

const Map: React.FC<MapProps> = ({
  onMarkerAdd,
  onMarkerRemove,
  markers = [],
  route = [],
  center = [-6.2088, 106.8456], // Jakarta default
  zoom = 13
}) => {
  const [mapMarkers, setMapMarkers] = useState<MarkerData[]>(markers);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const mapRef = useRef<L.Map>(null);

  // Update markers when props change
  useEffect(() => {
    setMapMarkers(markers);
  }, [markers]);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    if (isAddingMarker && onMarkerAdd) {
      const { lat, lng } = e.latlng;
      onMarkerAdd(lat, lng);
      setIsAddingMarker(false);
    }
  };

  const handleMarkerClick = (index: number) => {
    if (onMarkerRemove) {
      onMarkerRemove(index);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  const customMarkerIcon = (color: string = 'red') => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution={config.map.tileLayer.attribution}
          url={config.map.tileLayer.url}
        />
        
        <MapClickHandler />
        
        {/* Render markers */}
        {mapMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={customMarkerIcon(index === 0 ? 'green' : index === mapMarkers.length - 1 ? 'red' : 'blue')}
            eventHandlers={{
              click: () => handleMarkerClick(index),
            }}
          >
            <Popup>
              <div>
                <strong>{marker.label || `Marker ${index + 1}`}</strong>
                <br />
                Lat: {marker.lat.toFixed(6)}
                <br />
                Lng: {marker.lng.toFixed(6)}
                <br />
                <button 
                  onClick={() => handleMarkerClick(index)}
                  style={{ marginTop: '5px', padding: '2px 8px', fontSize: '12px' }}
                >
                  Remove
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Render route */}
        {route.length > 0 && (
          <Polyline
            positions={route}
            color="blue"
            weight={4}
            opacity={0.7}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
