import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { places } from '../data/places';
import { mountains } from '../data/mountains';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon paths for leaflet in some bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('../../node_modules/leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('../../node_modules/leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('../../node_modules/leaflet/dist/images/marker-shadow.png', import.meta.url).href
});

const CITY_CENTER = { lat: 42.3158, lng: 69.5947 }; // approximate Shymkent center

function haversineDistance(a, b) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDlat = Math.sin(dLat / 2);
  const sinDlon = Math.sin(dLon / 2);
  const aHarv = sinDlat * sinDlat + sinDlon * sinDlon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aHarv), Math.sqrt(1 - aHarv));
  return R * c;
}

const PlaceDetail = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const lang = i18n.language || 'kz';

  const place = places.find(p => String(p.id) === String(id));
  if (!place) return <div className="p-6">Place not found</div>;

  const placeLatLng = { lat: place.lat, lng: place.lng };

  const mountainsWithDist = useMemo(() => {
    return mountains.map(m => {
      const distFromCity = haversineDistance(CITY_CENTER, { lat: m.lat, lng: m.lng });
      const distFromPlace = haversineDistance(placeLatLng, { lat: m.lat, lng: m.lng });
      const walkHours = distFromCity / 5; // avg 5 km/h
      return { ...m, distFromCity: distFromCity.toFixed(2), distFromPlace: distFromPlace.toFixed(2), walkHours: walkHours };
    });
  }, [placeLatLng]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{place.name}</h1>
          <p className="text-gray-600">{place.fullDescription}</p>
        </div>
        <div className="text-right">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:brightness-105 transition"
          >
            {t('openMap') || 'Open map'}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-80 rounded-xl overflow-hidden shadow-md">
            <MapContainer center={[place.lat, place.lng]} zoom={12} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[place.lat, place.lng]}>
                <Popup>{place.name}</Popup>
              </Marker>
              <Marker position={[CITY_CENTER.lat, CITY_CENTER.lng]}>
                <Popup>Shymkent Center</Popup>
              </Marker>
              {mountainsWithDist.map(m => (
                <React.Fragment key={m.id}>
                  <Marker position={[m.lat, m.lng]} />
                  <Polyline positions={[[place.lat, place.lng], [m.lat, m.lng]]} pathOptions={{ color: '#ff6b6b' }} />
                </React.Fragment>
              ))}
            </MapContainer>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold mb-2">{t('transport') || 'Info'}</h3>
            <p className="text-sm text-gray-600">{place.address}</p>
            <p className="text-sm mt-2">{place.workingHours}</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold mb-3">{lang === 'kz' ? 'Таулар' : lang === 'ru' ? 'Горы' : 'Mountains'}</h3>
            <div className="space-y-3">
              {mountainsWithDist.map(m => (
                <div key={m.id} className="p-3 border rounded-lg hover:shadow-md transition flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{m.name[lang] || m.name.en}</div>
                    <div className="text-sm text-gray-600">{m.description[lang] || m.description.en}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-bold">{m.distFromCity} км</div>
                    <div className="text-gray-500">{Math.round(m.walkHours * 60)} мин (өзара есеп)</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold mb-2">{lang === 'kz' ? 'Координаттар' : lang === 'ru' ? 'Координаты' : 'Coordinates'}</h4>
            <p className="text-sm text-gray-600">Lat: {place.lat}<br/>Lng: {place.lng}</p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            <h4 className="font-semibold mb-2">{lang === 'kz' ? 'Қауіпсіздік' : lang === 'ru' ? 'Безопасность' : 'Safety'}</h4>
            <p className="text-sm text-yellow-800">{place.tip}</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold mb-2">{lang === 'kz' ? 'Қашықтық' : lang === 'ru' ? 'Расстояние' : 'Distance'}</h4>
            <p className="text-sm text-blue-800 font-bold">{haversineDistance(CITY_CENTER, placeLatLng).toFixed(2)} км from city center</p>
            <p className="text-sm text-gray-600">Approx. {Math.round((haversineDistance(CITY_CENTER, placeLatLng)/5)*60)} min walking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetail;
