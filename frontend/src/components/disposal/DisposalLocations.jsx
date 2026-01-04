import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center when location changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function DisposalLocations() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        fetchNearbyLocations(location);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Unable to get your location. Please enable location services.');
        setLoading(false);
      }
    );
  };

  const fetchNearbyLocations = async (location) => {
    try {
      // Use Overpass API to find nearby pharmacies and hospitals
      const radius = 3000; // 3km radius (reduced for faster response)
      const query = `
        [out:json][timeout:60];
        (
          node["amenity"="pharmacy"](around:${radius},${location.lat},${location.lng});
          node["amenity"="hospital"](around:${radius},${location.lat},${location.lng});
        );
        out body 20;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response:', text.substring(0, 200));
        throw new Error('Invalid response from location service');
      }

      const locations = data.elements.map(element => ({
        id: element.id,
        name: element.tags.name || 'Unnamed Location',
        type: element.tags.amenity,
        lat: element.lat,
        lon: element.lon,
        address: formatAddress(element.tags),
        phone: element.tags.phone || 'N/A',
        distance: calculateDistance(location.lat, location.lng, element.lat, element.lon)
      }));

      // Sort by distance
      locations.sort((a, b) => a.distance - b.distance);

      setNearbyLocations(locations.slice(0, 10)); // Get top 10 closest
      setLoading(false);
    } catch (err) {
      console.error('Error fetching locations:', err);

      // Provide fallback generic locations
      const fallbackLocations = [
        {
          id: 'generic-1',
          name: 'Local Pharmacy',
          type: 'pharmacy',
          lat: location.lat,
          lon: location.lng,
          address: 'Visit any nearby pharmacy',
          phone: 'N/A',
          distance: 'N/A'
        },
        {
          id: 'generic-2',
          name: 'Hospital',
          type: 'hospital',
          lat: location.lat,
          lon: location.lng,
          address: 'Visit your nearest hospital',
          phone: 'N/A',
          distance: 'N/A'
        }
      ];

      setNearbyLocations(fallbackLocations);
      setError('Unable to load exact locations. Please check with local pharmacies or hospitals for medicine disposal services.');
      setLoading(false);
    }
  };

  const formatAddress = (tags) => {
    const parts = [];
    if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
    if (tags['addr:street']) parts.push(tags['addr:street']);
    if (tags['addr:city']) parts.push(tags['addr:city']);
    if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
    return parts.length > 0 ? parts.join(', ') : 'Address not available';
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(2);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'pharmacy': return '💊';
      case 'hospital': return '🏥';
      case 'clinic': return '🩺';
      default: return '📍';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'pharmacy': return 'Pharmacy';
      case 'hospital': return 'Hospital';
      case 'clinic': return 'Clinic';
      default: return 'Location';
    }
  };

  if (loading) {
    return (
      <GlassCard padding="lg">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Finding nearby disposal locations...</p>
        </div>
      </GlassCard>
    );
  }

  // Don't show error card if we have fallback locations
  const showErrorCard = error && nearbyLocations.length === 0;

  if (showErrorCard) {
    return (
      <GlassCard padding="lg" className="bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/10">
        <div className="text-center py-8">
          <p className="text-2xl mb-2">⚠️</p>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={getUserLocation}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-4">
      {/* Warning if using fallback data */}
      {error && nearbyLocations.length > 0 && (
        <GlassCard padding="md" className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10 border-amber-300/50 dark:border-amber-700/50">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="flex-1">
              <p className="text-sm text-amber-900 dark:text-amber-100">
                {error} The disposal guidelines below still apply.
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* View Mode Toggle */}
      <div className="flex gap-2 justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode('map')}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === 'map'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          🗺️ Map View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-lg transition ${
            viewMode === 'list'
              ? 'bg-emerald-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          📋 List View
        </motion.button>
      </div>

      {viewMode === 'map' && userLocation ? (
        <GlassCard padding="none" className="overflow-hidden">
          <div style={{ height: '500px', width: '100%' }}>
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <ChangeView center={[userLocation.lat, userLocation.lng]} zoom={13} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* User location marker */}
              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>
                  <strong>Your Location</strong>
                </Popup>
              </Marker>

              {/* Nearby locations markers */}
              {nearbyLocations.map(location => (
                <Marker key={location.id} position={[location.lat, location.lon]}>
                  <Popup>
                    <div className="p-2">
                      <p className="font-bold">{getTypeIcon(location.type)} {location.name}</p>
                      <p className="text-sm text-gray-600">{getTypeLabel(location.type)}</p>
                      <p className="text-sm mt-1">{location.address}</p>
                      {location.phone !== 'N/A' && (
                        <p className="text-sm">📞 {location.phone}</p>
                      )}
                      <p className="text-sm font-semibold mt-1">📏 {location.distance} km away</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {nearbyLocations.length === 0 ? (
            <GlassCard padding="lg">
              <p className="text-center text-gray-600 dark:text-gray-400">
                No disposal locations found nearby. Try expanding your search radius.
              </p>
            </GlassCard>
          ) : (
            nearbyLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard padding="md" className="hover:shadow-lg transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getTypeIcon(location.type)}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{location.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{getTypeLabel(location.type)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        📍 {location.address}
                      </p>
                      {location.phone !== 'N/A' && (
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          📞 {location.phone}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {location.distance} km
                      </p>
                      <p className="text-xs text-gray-500">away</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
