import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import weatherService from '../services/weatherService';

const DEFAULT_COORDS = { lat: 42.3158, lon: 69.5947 }; // Shymkent

const WeatherWidget = () => {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load(coords) {
      setLoading(true);
      setError(null);
      try {
        const data = await weatherService.getWeather({ lat: coords.lat, lon: coords.lon, lang: i18n.language || 'en' });
        if (!mounted) return;
        setWeather(data);
      } catch (e) {
        console.error('Weather load error', e);
        if (!mounted) return;
        setError(e.message || 'Failed to load weather');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // Prefer browser geolocation, fallback to default city coords
    if (navigator.geolocation) {
      const geoTimeout = setTimeout(() => load(DEFAULT_COORDS), 3000);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(geoTimeout);
          load({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        () => {
          clearTimeout(geoTimeout);
          load(DEFAULT_COORDS);
        },
        { maximumAge: 1000 * 60 * 5, timeout: 3000 }
      );
    } else {
      load(DEFAULT_COORDS);
    }

    return () => { mounted = false; };
  }, [i18n.language]);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = DEFAULT_COORDS;
      if (navigator.geolocation) {
        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition((pos) => {
            coords.lat = pos.coords.latitude; coords.lon = pos.coords.longitude; resolve();
          }, () => resolve(), { timeout: 2000 });
        });
      }
      const data = await weatherService.getWeather({ lat: coords.lat, lon: coords.lon, lang: i18n.language || 'en', forceRefresh: true });
      setWeather(data);
    } catch (e) {
      console.error('Weather refresh error', e);
      setError(e.message || 'Failed to refresh');
    } finally {
      setLoading(false);
    }
  };

  const iconFor = (iconUrl) => (
    iconUrl ? <img src={iconUrl} alt="icon" className="w-12 h-12" /> : <span className="text-4xl">🌤️</span>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-800 rounded-lg p-4">
        <strong>Weather error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{t('weather')} - Шымкент</h3>
        <div className="flex items-center space-x-2">
          <button onClick={refresh} className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded">Обновить</button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-5xl">
          {iconFor(weather.icon)}
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{weather.temperature}°C</div>
          <div className="text-blue-100 capitalize">{weather.description}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="bg-blue-500 bg-opacity-50 rounded p-2 text-center">
          <div>Ылғалдылық</div>
          <div className="font-bold">{weather.humidity}%</div>
        </div>
        <div className="bg-blue-500 bg-opacity-50 rounded p-2 text-center">
          <div>Жел</div>
          <div className="font-bold">{weather.wind} км/сағ</div>
        </div>
      </div>

      <div className="border-t border-blue-300 pt-4">
        <h4 className="font-bold mb-3">
          {i18n.language === 'kz' ? 'Алдағы күндер' : i18n.language === 'ru' ? 'Прогноз' : 'Forecast'}
        </h4>
        <div className="flex justify-between text-sm">
          {(weather.forecast || []).map((day, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">{day.day}</div>
              <div className="text-2xl my-1">
                {day.conditionIcon ? <img src={day.conditionIcon} alt="ic" className="inline w-8 h-8" /> : '🌤️'}
              </div>
              <div className="font-bold">{day.tempMax}° / {day.tempMin}°C</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-xs text-blue-100">Источник: OpenWeatherMap • Координаты: {weather.source?.coords?.lat},{weather.source?.coords?.lon} • Обновлено: {new Date((weather.source?.timestamp||Date.now()/1000)*1000).toLocaleString()}</div>
    </div>
  );
};

export default WeatherWidget;