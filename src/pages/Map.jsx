import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapComponent from '../components/MapComponent';
import { places } from '../data/places';

const Map = () => {
  const { t } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('map')}</h1>
        <p className="text-gray-600">
          {t('language') === 'kz' ? 'Шымкенттің интерактивті картасы' :
           t('language') === 'ru' ? 'Интерактивная карта Шымкента' : 
           'Interactive map of Shymkent'}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <MapComponent places={places} onPlaceSelect={handlePlaceSelect} />
      </div>

      {selectedPlace && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">{selectedPlace.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">{t('description')}:</h4>
              <p className="text-gray-700">{selectedPlace.fullDescription}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t('language') === 'kz' ? 'Мекенжай' :
                 t('language') === 'ru' ? 'Адрес' : 'Address'}:
              </h4>
              <p className="text-gray-700">{selectedPlace.address}</p>
              
              <h4 className="font-semibold mt-4 mb-2">
                {t('language') === 'kz' ? 'Жұмыс уақыты' :
                 t('language') === 'ru' ? 'Время работы' : 'Working hours'}:
              </h4>
              <p className="text-gray-700">{selectedPlace.workingHours}</p>
              
              <h4 className="font-semibold mt-4 mb-2">
                {t('language') === 'kz' ? 'Кіру бағасы' :
                 t('language') === 'ru' ? 'Стоимость входа' : 'Entrance fee'}:
              </h4>
              <p className="text-gray-700">{selectedPlace.entranceFee}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-blue-800">
          {t('language') === 'kz' ? 'Картаны қалай пайдалануға болады:' :
           t('language') === 'ru' ? 'Как использовать карту:' : 'How to use the map:'}
        </h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700">
          <li>{t('language') === 'kz' ? 'Картадағы белгілерді басып, орын туралы ақпаратты оқыңыз' :
               t('language') === 'ru' ? 'Нажмите на маркеры на карте, чтобы прочитать информацию о месте' :
               'Click on markers on the map to read information about the place'}</li>
          <li>{t('language') === 'kz' ? 'Сіздің орналасқан жеріңіз автоматты түрде көрсетіледі' :
               t('language') === 'ru' ? 'Ваше местоположение будет показано автоматически' :
               'Your location will be shown automatically'}</li>
          <li>{t('language') === 'kz' ? 'Маршрут түймесін басып, таңдалған орынға дейін жолды көріңіз' :
               t('language') === 'ru' ? 'Нажмите кнопку маршрута, чтобы увидеть путь к выбранному месту' :
               'Click the directions button to see route to selected place'}</li>
        </ul>
      </div>
    </div>
  );
};

export default Map;