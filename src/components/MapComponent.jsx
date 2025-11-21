import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('../../node_modules/leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('../../node_modules/leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('../../node_modules/leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});

const LocationMarker = ({ onLocationFound }) => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      if (onLocationFound) {
        onLocationFound(e.latlng);
      }
    });
  }, [map, onLocationFound]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Сіздің орналасқан жеріңіз</Popup>
    </Marker>
  );
};

const MapComponent = ({ places, onPlaceSelect }) => {
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Default center - Shymkent
  const defaultCenter = [42.3417, 69.5901];

  const handleLocationFound = (location) => {
    setUserLocation(location);
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
    if (onPlaceSelect) {
      onPlaceSelect(place);
    }
  };

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarker onLocationFound={handleLocationFound} />
        
        {(places || []).map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            eventHandlers={{
              click: () => handlePlaceClick(place),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg">{place.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                {userLocation && (
                  <button
                    className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    onClick={() => {
                      // Simple directions simulation
                      const distance = Math.sqrt(
                        Math.pow(place.lat - userLocation.lat, 2) + 
                        Math.pow(place.lng - userLocation.lng, 2)
                      ) * 111; // Approximate km
                      alert(`${t('directions')}: ${place.name} - ${distance.toFixed(1)} км`);
                    }}
                  >
                    {t('directions')}
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {selectedPlace && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold text-lg">{selectedPlace.name}</h3>
          <p className="text-gray-600">{selectedPlace.description}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;