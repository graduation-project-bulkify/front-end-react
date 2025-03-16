/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng, Icon } from 'leaflet';
import { MapPin, Search } from 'lucide-react';

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapEvents({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

const LocationPicker = ({ setValue1, setValue2 }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const mapRef = useRef(null);

  const defaultCenter = {
    lat: 29.999572,
    lng: 32.495359,
  };
  // Removed redundant LocationPicker declaration
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // Set the latitude and longitude using setValue1 and setValue2 if they are valid functions
    if (typeof setValue1 === 'function' && typeof setValue2 === 'function') {
      setValue1(location.lat);
      setValue2(location.lng);
    } else {
      console.error('setValue1 or setValue2 is not a function');
    }
  };

  const handleSearchResultClick = (result) => {
    const location = {
      lat: parseFloat(result.lat.toFixed(6)),
      lng: parseFloat(result.lon.toFixed(6)),
    };
    handleLocationSelect(location); // Update selected location and pass lat/lng to parent
    setSearchResults([]);
    setSearchQuery(result.display_name);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {searchResults.length > 0 && (
          <div className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-lg shadow-lg">
            {searchResults.map((result) => (
              <div
                key={result.place_id}
                onClick={() => handleSearchResultClick(result)}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                <span>{result.display_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '400px' }}>
        <MapContainer
          center={selectedLocation || defaultCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents onLocationSelect={handleLocationSelect} />
          {selectedLocation && (
            <Marker
              position={new LatLng(selectedLocation.lat.toFixed(6), selectedLocation.lng.toFixed(6))}
              icon={customIcon}
            />
          )}
        </MapContainer>
      </div>

      {selectedLocation && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Selected Location:</h3>
          <p className="text-gray-700">Latitude: {selectedLocation.lat.toFixed(6)}</p>
          <p className="text-gray-700">Longitude: {selectedLocation.lng.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
