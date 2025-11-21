import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PlacesList = ({ places, onPlaceSelect }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: t('allPlaces') },
    { id: 'historical', name: 'Тарихи орындар' },
    { id: 'parks', name: 'Саябақтар' },
    { id: 'shopping', name: 'Сауда орталықтары' },
    { id: 'religious', name: 'Діни орындар' }
  ];

  const safePlaces = places || [];
  const filteredPlaces = selectedCategory === 'all'
    ? safePlaces
    : safePlaces.filter(place => place.category === selectedCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filteredPlaces || []).map(place => (
          <Link
            key={place.id}
            to={`/places/${place.id}`}
            className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            onClick={() => onPlaceSelect && onPlaceSelect(place)}
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {place.image ? (
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Сурет жоқ</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{place.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{place.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{place.category}</span>
                <span>{place.distance} км</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;