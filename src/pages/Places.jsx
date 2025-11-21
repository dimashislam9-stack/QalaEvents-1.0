import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlacesList from '../components/PlacesList';
import { places } from '../data/places';

const Places = () => {
  const { t } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('places')}</h1>
        <p className="text-gray-600">
          {t('language') === 'kz' ? 'Шымкенттегі барлық танымал туристік орындар' :
           t('language') === 'ru' ? 'Все популярные туристические места в Шымкенте' :
           'All popular tourist places in Shymkent'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <PlacesList places={places} onPlaceSelect={handlePlaceSelect} />
      </div>

      {selectedPlace && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedPlace(null)}
          />

          <div className="relative bg-white rounded-xl shadow-2xl max-w-5xl w-full mx-4 p-6 overflow-auto" style={{ maxHeight: '90vh' }}>
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedPlace(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4">{selectedPlace.name}</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-4">{selectedPlace.fullDescription}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('language') === 'kz' ? 'Мекенжай' : t('language') === 'ru' ? 'Адрес' : 'Address'}:
                      </h4>
                      <p className="text-gray-600">{selectedPlace.address}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('language') === 'kz' ? 'Жұмыс уақыты' : t('language') === 'ru' ? 'Время работы' : 'Working hours'}:
                      </h4>
                      <p className="text-gray-600">{selectedPlace.workingHours}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('language') === 'kz' ? 'Кіру бағасы' : t('language') === 'ru' ? 'Стоимость входа' : 'Entrance fee'}:
                      </h4>
                      <p className="text-gray-600">{selectedPlace.entranceFee}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        {t('language') === 'kz' ? 'Телефон' : t('language') === 'ru' ? 'Телефон' : 'Phone'}:
                      </h4>
                      <p className="text-gray-600">{selectedPlace.phone}</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2">{t('language') === 'kz' ? 'Кеңес:' : t('language') === 'ru' ? 'Совет:' : 'Tip:'}</h4>
                    <p className="text-yellow-700">{selectedPlace.tip}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">{t('language') === 'kz' ? 'Координаттар' : t('language') === 'ru' ? 'Координаты' : 'Coordinates'}:</h4>
                  <p className="text-sm text-gray-600">Lat: {selectedPlace.lat}<br />Lng: {selectedPlace.lng}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-green-800">{t('language') === 'kz' ? 'Ең жақын орындар' : t('language') === 'ru' ? 'Ближайшие места' : 'Nearby places'}:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {selectedPlace.nearbyPlaces?.map((place, index) => (<li key={index}>• {place}</li>))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-blue-800">{t('language') === 'kz' ? 'Ұсынылатын белсенділіктер' : t('language') === 'ru' ? 'Рекомендуемые активности' : 'Recommended activities'}:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    {selectedPlace.activities?.map((activity, index) => (<li key={index}>• {activity}</li>))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Places;