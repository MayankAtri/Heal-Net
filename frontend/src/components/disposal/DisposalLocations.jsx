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
  const [viewMode, setViewMode] = useState('map');

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
      const radius = 3000;
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

      locations.sort((a, b) => a.distance - b.distance);

      setNearbyLocations(locations.slice(0, 10));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching locations:', err);

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
    const R = 6371;
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
      case 'pharmacy':
        return (
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082" />
          </svg>
        );
      case 'hospital':
        return (
          <svg className="w-5 h-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-stone-500 dark:text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        );
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
          <p className="mt-4 text-stone-500 dark:text-stone-400">Finding nearby disposal locations...</p>
        </div>
      </GlassCard>
    );
  }

  const showErrorCard = error && nearbyLocations.length === 0;

  if (showErrorCard) {
    return (
      <GlassCard padding="lg" className="bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:from-red-900/10 dark:to-rose-900/10">
        <div className="text-center py-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-red-500/10 dark:bg-red-500/20 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={getUserLocation}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium"
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
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
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
          className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm flex items-center gap-2 ${
            viewMode === 'map'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-stone-100 dark:bg-dark-surface text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60 hover:border-stone-300 dark:hover:border-stone-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
          Map View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm flex items-center gap-2 ${
            viewMode === 'list'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-stone-100 dark:bg-dark-surface text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-700/60 hover:border-stone-300 dark:hover:border-stone-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          List View
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

              <Marker position={[userLocation.lat, userLocation.lng]}>
                <Popup>
                  <strong>Your Location</strong>
                </Popup>
              </Marker>

              {nearbyLocations.map(location => (
                <Marker key={location.id} position={[location.lat, location.lon]}>
                  <Popup>
                    <div className="p-2">
                      <p className="font-bold">{location.name}</p>
                      <p className="text-sm text-stone-600">{getTypeLabel(location.type)}</p>
                      <p className="text-sm mt-1">{location.address}</p>
                      {location.phone !== 'N/A' && (
                        <p className="text-sm">{location.phone}</p>
                      )}
                      <p className="text-sm font-semibold mt-1">{location.distance} km away</p>
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
              <p className="text-center text-stone-500 dark:text-stone-400">
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
                <GlassCard padding="md" className="hover:shadow-lg hover:border-emerald-300/50 dark:hover:border-emerald-700/50 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-stone-50 dark:bg-dark-surface flex items-center justify-center">
                          {getTypeIcon(location.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-900 dark:text-white">{location.name}</h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400">{getTypeLabel(location.type)}</p>
                        </div>
                      </div>
                      <div className="ml-10 space-y-1">
                        <p className="text-sm text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {location.address}
                        </p>
                        {location.phone !== 'N/A' && (
                          <p className="text-sm text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            {location.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {location.distance} km
                      </p>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-medium">away</p>
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
