import React, { useState } from 'react';

// ===============================================
// 1. Standalone i18n/Translation Logic (Аударма логикасы)
// ===============================================

// Translation data object (Аударма деректерінің жиынтығы)
const resources = {
  kz: {
    translation: {
      appTitle: "Шымкент Көлік Ақпараты",
      // TransportInfo Keys
      transport: {
        busName: "Автобус",
        taxiName: "Такси",
        busRoutesTitle: "Автобус маршруттары",
        taxiServicesTitle: "Такси сервистері",
        interval: "Интервал",
        emergencyTitle: "Төтенше көлік және медициналық көмек:",
        ambulance: "Жедел жәрдем: 103",
        police: "Полиция: 102",
        fire: "Өрт сөндіру: 101"
      },

      // Route Names
      routes: {
        bus10: "Арбат - Тәуелсіздік саябағы",
        bus25: "Наурыз алаңы - Mega Planet",
        bus35: "Бектөре - Шымкент Plaza",
        bus42: "Хайуанаттар бағы - Дендросаябақ",
      }
    }
  },
  ru: {
    translation: {
      appTitle: "Информация о транспорте Шымкента",
      // TransportInfo Keys
      transport: {
        busName: "Автобус",
        taxiName: "Такси",
        busRoutesTitle: "Автобусные маршруты",
        taxiServicesTitle: "Сервисы такси",
        interval: "Интервал",
        emergencyTitle: "Экстренный транспорт и медицинская помощь:",
        ambulance: "Скорая помощь: 103",
        police: "Полиция: 102",
        fire: "Пожарная служба: 101"
      },

      // Route Names
      routes: {
        bus10: "Арбат - Парк Независимости",
        bus25: "Площадь Наурыз - Mega Planet",
        bus35: "Бекторе - Shymkent Plaza",
        bus42: "Зоопарк - Дендропарк",
      }
    }
  },
  en: {
    translation: {
      appTitle: "Shymkent Transport Information",
      // TransportInfo Keys
      transport: {
        busName: "Bus",
        taxiName: "Taxi",
        busRoutesTitle: "Bus Routes",
        taxiServicesTitle: "Taxi Services",
        interval: "Interval",
        emergencyTitle: "Emergency transport and medical help:",
        ambulance: "Ambulance: 103",
        police: "Police: 102",
        fire: "Fire: 101"
      },

      // Route Names
      routes: {
        bus10: "Arbat - Independence Park",
        bus25: "Nauryz Square - Mega Planet",
        bus35: "Bektore - Shymkent Plaza",
        bus42: "Zoo - Dendropark",
      }
    }
  }
};

// Helper function to safely retrieve translation (Аударма кілтін табатын көмекші функция)
const getTranslation = (lang, key) => {
  const translations = resources[lang]?.translation;
  if (!translations) return null;

  if (key.includes('.')) {
    const [section, subKey] = key.split('.');
    return translations[section]?.[subKey];
  }
  
  return translations[key];
};

// Main translation function with fallback to English (Негізгі аударма функциясы)
const translate = (lang, key) => {
  // 1. Check current language (Ағымдағы тілде іздеу)
  let result = getTranslation(lang, key);
  if (result) return result;

  // 2. Fallback to English (Ағылшын тіліне қайта оралу)
  result = getTranslation('en', key);
  if (result) return result;
  
  // 3. Return the key itself if nothing is found (Егер ештеңе табылбаса, кілттің өзін қайтару)
  return key;
};

// ===============================================
// 2. TransportInfo Component (Көлік ақпараты компоненті)
// ===============================================

// This component now receives the translation function (t) and current language (currentLang) as props
const TransportInfo = ({ t, currentLang }) => {
  const [activeTab, setActiveTab] = useState('bus');

  // Hardcoded transport data using translation keys
  const transportData = {
    bus: {
      name: t('transport.busName'),
      routes: [
        { number: '10', route: t('routes.bus10'), interval: '15 мин', price: '80 ₸' },
        { number: '25', route: t('routes.bus25'), interval: '20 мин', price: '80 ₸' },
        { number: '35', route: t('routes.bus35'), interval: '10 мин', price: '80 ₸' },
        { number: '42', route: t('routes.bus42'), interval: '25 мин', price: '80 ₸' }
      ]
    },
    taxi: {
      name: t('transport.taxiName'),
      services: [
        { name: 'Yandex Taxi', phone: '+7 705 123 4567', app: 'Yandex Go' },
        { name: 'InDriver', phone: '+7 701 234 5678', app: 'inDriver' },
        { name: 'Jetisu Taxi', phone: '135', app: 'Jetisu Taxi' },
        { name: 'Maxim', phone: '+7 707 345 6789', app: 'Maxim' }
      ]
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-4 max-w-lg mx-auto my-8">
      <h3 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        {t('appTitle')}
      </h3>
      
      {/* Tabs for Bus/Taxi (Автобус/Такси табы) */}
      <div className="flex border-b border-gray-200 rounded-t-xl overflow-hidden mb-4">
        {Object.keys(transportData).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 ease-in-out border-b-2 ${
              activeTab === key
                ? 'bg-green-600 text-white border-green-600 shadow-md'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-transparent'
            }`}
          >
            {transportData[key].name}
          </button>
        ))}
      </div>

      {/* Content based on active tab (Активті табқа негізделген контент) */}
      <div className="p-2">
        {activeTab === 'bus' && (
          <div>
            <h4 className="font-bold mb-4 text-lg text-gray-700">
              {t('transport.busRoutesTitle')}
            </h4>

            <div className="space-y-3">
              {transportData.bus.routes.map((route, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-extrabold shadow-md min-w-[50px] text-center">
                      {route.number}
                    </span>
                    <span className="text-xl font-bold text-green-600">{route.price}</span>
                  </div>

                  <div className="text-base font-medium text-gray-700 mb-2">{route.route}</div>

                  <div className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {t('transport.interval')}: {route.interval}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'taxi' && (
          <div>
            <h4 className="font-bold mb-4 text-lg text-gray-700">
              {t('transport.taxiServicesTitle')}
            </h4>

            <div className="space-y-3">
              {transportData.taxi.services.map((service, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-extrabold text-gray-900">{service.name}</span>
                    <span className="text-sm bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                      {service.app}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-base">
                    <span className="text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </span>
                    <a
                      href={`tel:${service.phone}`}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      {service.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Emergency (Төтенше жағдайлар ақпараты) */}
      <div className="bg-red-50 border-t border-red-200 rounded-b-xl p-4 mt-6">
        <h5 className="font-bold text-red-800 mb-3 text-lg">
          {t('transport.emergencyTitle')}
        </h5>

        <div className="text-base text-red-700 space-y-2">
          <div className="flex items-center">
            <span role="img" aria-label="Ambulance" className="mr-2 text-xl">🚑</span>
            {t('transport.ambulance')}
          </div>
          <div className="flex items-center">
            <span role="img" aria-label="Police" className="mr-2 text-xl">🚓</span>
            {t('transport.police')}
          </div>
          <div className="flex items-center">
            <span role="img" aria-label="Fire" className="mr-2 text-xl">🚒</span>
            {t('transport.fire')}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 3. Main App Component (Негізгі қолданба)
// ===============================================

const App = () => {
  const [currentLang, setCurrentLang] = useState('kz'); // Default language is Kazakh

  // Function to get translation based on current language
  const t = (key) => translate(currentLang, key);

  const changeLanguage = (lng) => {
    setCurrentLang(lng);
  };

  const LangButton = ({ langCode, label }) => (
    <button
      onClick={() => changeLanguage(langCode)}
      className={`px-4 py-2 mx-1 rounded-full font-semibold transition-colors duration-200 ${
        currentLang === langCode
          ? 'bg-red-600 text-white shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      {/* Language Switchers (Тілді ауыстыру батырмалары) */}
      <div className="flex justify-center p-4">
        <LangButton langCode="kz" label="Қазақша" />
        <LangButton langCode="ru" label="Русский" />
        <LangButton langCode="en" label="English" />
      </div>

      {/* Transport Info Component (Көлік ақпараты компоненті) */}
      <TransportInfo t={t} currentLang={currentLang} />

      {/* Tailwind CSS CDN and custom styles (Tailwind CSS және арнайы стильдер) */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        /* Ensure 'Inter' font is used (Inter шрифтін қамтамасыз ету) */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default App;