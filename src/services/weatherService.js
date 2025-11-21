// Minimal weather service using OpenWeatherMap
// Exports: getWeather({ lat, lon, lang }) -> { temperature, condition, humidity, wind, forecast: [{day, temp, condition}] }

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const BASE = 'https://api.openweathermap.org/data/2.5';

function toDayLabel(dt, locale) {
  const d = new Date(dt * 1000);
  return d.toLocaleDateString(locale, { weekday: 'short' });
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getWeather({ lat = 42.3158, lon = 69.5947, lang = 'en', units = 'metric', forceRefresh = false } = {}) {
  if (!API_KEY) {
    throw new Error('VITE_WEATHER_API_KEY is not set');
  }

  // Try to use simple caching in localStorage for 10 minutes to avoid rate limits
  const cacheKey = `weather:${lat}:${lon}:${units}:${lang}`;
  if (!forceRefresh) {
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
      if (cached && Date.now() - cached.ts < 10 * 60 * 1000) {
        return cached.data;
      }
    } catch (e) {
      // ignore
    }
  } else {
    try { localStorage.removeItem(cacheKey); } catch(e){}
  }

  // current weather
  const q1 = `${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;
  // 5-day forecast (3h steps) - we'll reduce to 3-day daily highs/lows
  const q2 = `${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=${lang}`;

  const [curr, fore] = await Promise.all([fetchJson(q1), fetchJson(q2)]);

  // Debug: log raw API responses to help diagnose unexpected forecasts
  try { console.debug('OpenWeather current:', curr); console.debug('OpenWeather forecast:', fore); } catch (e) {}

  const data = {
    temperature: Math.round(curr.main.temp),
    condition: curr.weather && curr.weather[0] ? curr.weather[0].main : '',
    description: curr.weather && curr.weather[0] ? curr.weather[0].description : '',
    humidity: curr.main.humidity,
    // convert m/s -> km/h for more familiar unit
    wind: Math.round((curr.wind && curr.wind.speed ? curr.wind.speed : 0) * 3.6),
    icon: curr.weather && curr.weather[0] ? `https://openweathermap.org/img/wn/${curr.weather[0].icon}@2x.png` : null,
    forecast: [],
    source: {
      coords: { lat, lon },
      timestamp: curr.dt || Math.floor(Date.now()/1000)
    }
  };

  // Aggregate forecast by day (next 3 days) using min/max
  const daily = {};
  fore.list.forEach((item) => {
    const day = new Date(item.dt * 1000).toISOString().slice(0,10);
    if (!daily[day]) daily[day] = { temps: [], icons: [] };
    daily[day].temps.push(item.main.temp);
    if (item.weather && item.weather[0]) daily[day].icons.push(item.weather[0].icon);
  });

  const days = Object.keys(daily).slice(0, 4); // today + next 3 days
  const locale = lang;
  data.forecast = days.map((dayStr, idx) => {
    const dt = new Date(dayStr + 'T12:00:00Z').getTime() / 1000;
    const temps = daily[dayStr].temps;
    const maxTemp = Math.round(Math.max(...temps));
    const minTemp = Math.round(Math.min(...temps));
    const icon = daily[dayStr].icons.length ? daily[dayStr].icons[Math.floor(daily[dayStr].icons.length/2)] : null;
    return {
      day: idx === 0 ? (lang === 'kz' ? 'Бүгін' : lang === 'ru' ? 'Сегодня' : 'Today') : toDayLabel(dt, locale),
      tempMax: maxTemp,
      tempMin: minTemp,
      conditionIcon: icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null
    };
  }).slice(0,3);

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
  } catch (e) {
    // ignore storage errors
  }

  return data;
}

export default { getWeather };
