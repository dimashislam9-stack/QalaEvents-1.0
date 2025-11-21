import React, { useState, useEffect } from 'react';

// ===============================================
// 1. Standalone i18n/Translation Logic (Аударма логикасы)
// ===============================================

// Translation data object (Аударма деректерінің жиынтығы)
const resources = {
  kz: {
    translation: {
      // General App Keys
      appTitle: "Шымкент Қауіпсіздік және Ақпарат Порталы",
      safety: "Қауіпсіздік",
      mainDescription: "Шымкенттегі қауіпсіз және жағымды саяхат үшін барлық қажетті ақпарат",
      emergency: "Төтенше жағдай",
      emergencyText: "Төтенше жағдайларда бір басумен 112 нөміріне қоңырау шалу",
      safetyTips: "Қауіпсіздік бойынша кеңестер",
      emergencyContactsTitle: "Төтенше байланыс нөмірлері",
      transportTitle: "Қалалық Көлік Ақпараты",
      importantNotesTitle: "Маңызды ескертулер:",
      
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
      routes: {
        bus10: "Арбат - Тәуелсіздік саябағы",
        bus25: "Наурыз алаңы - Mega Planet",
        bus35: "Бектөре - Шымкент Plaza",
        bus42: "Хайуанаттар бағы - Дендросаябақ",
      },

      // Emergency Contacts Details
      contacts: [
        { name: 'Төтенше жағдайлар', number: '112', description: 'Бірыңғай төтенше қызмет' },
        { name: 'Полиция', number: '102', description: 'Полиция қызметі' },
        { name: 'Жедел медициналық көмек', number: '103', description: 'Медициналық жедел жәрдем' },
        { name: 'Өрт қызметі', number: '101', description: 'Өрт сөндіру қызметі' },
        { name: 'Такси диспетчері', number: '+7 7252 55-55-55', description: 'Жедел такси' },
        { name: 'Аурухана', number: '+7 7252 45-12-34', description: 'Орталық аурухана' }
      ],

      // Additional Notes
      notes: [
        'Шымкент қауіпсіз қала, бірақ әрқашан сақ болыңыз',
        'Жергілікті тұрғындар өте мейманшыл және көмекке дайын',
        'Көптеген адамдар орыс тілінде сөйлейді, кейбіреулер ағылшын тілін біледі',
        'Су ішуге жарамды тек бөтелкеленген суды сатып алыңыз'
      ]
    }
  },
  ru: {
    translation: {
      // General App Keys
      appTitle: "Портал Безопасности и Информации Шымкента",
      safety: "Безопасность",
      mainDescription: "Вся необходимая информация для безопасного и приятного путешествия по Шымкенту",
      emergency: "Экстренная Ситуация",
      emergencyText: "Экстренный вызов 112 одним нажатием в чрезвычайных ситуациях",
      safetyTips: "Советы по безопасности",
      emergencyContactsTitle: "Экстренные контакты",
      transportTitle: "Информация о Городском Транспорте",
      importantNotesTitle: "Важные заметки:",
      
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
      routes: {
        bus10: "Арбат - Парк Независимости",
        bus25: "Площадь Наурыз - Mega Planet",
        bus35: "Бекторе - Shymkent Plaza",
        bus42: "Зоопарк - Дендропарк",
      },

      // Emergency Contacts Details
      contacts: [
        { name: 'Экстренная служба', number: '112', description: 'Единая экстренная служба' },
        { name: 'Полиция', number: '102', description: 'Служба полиции' },
        { name: 'Скорая помощь', number: '103', description: 'Медицинская скорая помощь' },
        { name: 'Пожарная служба', number: '101', description: 'Пожарная служба' },
        { name: 'Диспетчер такси', number: '+7 7252 55-55-55', description: 'Срочное такси' },
        { name: 'Больница', number: '+7 7252 45-12-34', description: 'Центральная больница' }
      ],

      // Additional Notes
      notes: [
        'Шымкент безопасный город, но всегда будьте внимательны',
        'Местные жители очень гостеприимны и готовы помочь',
        'Многие люди говорят по-русски, некоторые знают английский',
        'Покупайте только бутилированную воду для питья'
      ]
    }
  },
  en: {
    translation: {
      // General App Keys
      appTitle: "Shymkent Safety and Information Portal",
      safety: "Safety",
      mainDescription: "All necessary information for safe and enjoyable travel in Shymkent",
      emergency: "Emergency",
      emergencyText: "One-tap emergency call to 112 in critical situations",
      safetyTips: "Safety Tips",
      emergencyContactsTitle: "Emergency Contacts",
      transportTitle: "City Transport Information",
      importantNotesTitle: "Important notes:",

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
      routes: {
        bus10: "Arbat - Independence Park",
        bus25: "Nauryz Square - Mega Planet",
        bus35: "Bektore - Shymkent Plaza",
        bus42: "Zoo - Dendropark",
      },

      // Emergency Contacts Details
      contacts: [
        { name: 'Emergency Services', number: '112', description: 'Unified emergency service' },
        { name: 'Police', number: '102', description: 'Police service' },
        { name: 'Ambulance', number: '103', description: 'Medical emergency' },
        { name: 'Fire Service', number: '101', description: 'Firefighting service' },
        { name: 'Taxi Dispatcher', number: '+7 7252 55-55-55', description: 'Express taxi' },
        { name: 'Hospital', number: '+7 7252 45-12-34', description: 'Central Hospital' }
      ],
      
      // Additional Notes
      notes: [
        'Shymkent is a safe city, but always be cautious',
        'Local residents are very hospitable and ready to help',
        'Many people speak Russian, some know English',
        'Buy only bottled water for drinking'
      ]
    }
  }
};

// Helper function to safely retrieve translation
const getTranslation = (lang, key) => {
  const translations = resources[lang]?.translation;
  if (!translations) return null;

  if (key.includes('.')) {
    const [section, subKey] = key.split('.');
    return translations[section]?.[subKey];
  }
  
  return translations[key];
};

// Main translation function with fallback to English
const translate = (lang, key) => {
  let result = getTranslation(lang, key);
  if (result) return result;

  // Fallback
  result = getTranslation('en', key);
  if (result) return result;
  
  return key;
};

// ===============================================
// 2. Integrated Components
// ===============================================

// Mock SOS Button (Төтенше жағдай түймесі)
const SOSButton = ({ t }) => {
  const handleSOS = () => {
    // In a real app, this would initiate a call or send location data.
    // Нақты қолданбада мұнда арнайы модальдық терезе қолданылуы керек.
    alert('Calling 112 (Emergency Services)...');
  };

  return (
    <button
      onClick={handleSOS}
      className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-2xl py-4 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center mx-auto"
    >
      <svg className="w-8 h-8 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      SOS 112
    </button>
  );
};

// Mock Weather Widget (Ауа-райы виджеті)
const WeatherWidget = ({ t, currentLang }) => {
  const [weather, setWeather] = useState({
    city: 'Шымкент',
    temp: 28,
    condition: currentLang === 'kz' ? 'Күн ашық' : currentLang === 'ru' ? 'Солнечно' : 'Sunny',
    icon: '☀️',
  });
  
  // Update condition based on language change
  useEffect(() => {
    const conditions = {
      kz: 'Күн ашық',
      ru: 'Солнечно',
      en: 'Sunny'
    };
    setWeather(prev => ({ ...prev, condition: conditions[currentLang] || conditions['en'] }));
  }, [currentLang]);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl p-6 text-white h-full flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{weather.city}</h3>
        <p className="text-4xl">{weather.icon}</p>
      </div>
      <div className="mt-4">
        <p className="text-6xl font-extrabold">{weather.temp}°C</p>
        <p className="text-xl font-light mt-1">{weather.condition}</p>
      </div>
    </div>
  );
};

// Transport Info Component (Көлік ақпараты)
const TransportInfo = ({ t, currentLang }) => {
  const [activeTab, setActiveTab] = useState('bus');

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
    <div className="bg-white rounded-xl overflow-hidden mt-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 overflow-hidden">
        {Object.keys(transportData).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 ease-in-out border-b-2 ${
              activeTab === key
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-transparent'
            }`}
          >
            {transportData[key].name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'bus' && (
          <div>
            <h4 className="font-bold mb-4 text-md text-gray-700">
              {t('transport.busRoutesTitle')}
            </h4>
            <div className="space-y-3">
              {transportData.bus.routes.map((route, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-sm font-extrabold min-w-[40px] text-center">
                      {route.number}
                    </span>
                    <span className="text-lg font-bold text-green-600">{route.price}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">{route.route}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    {t('transport.interval')}: {route.interval}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'taxi' && (
          <div>
            <h4 className="font-bold mb-4 text-md text-gray-700">
              {t('transport.taxiServicesTitle')}
            </h4>
            <div className="space-y-3">
              {transportData.taxi.services.map((service, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-3 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-extrabold text-gray-900">{service.name}</span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
                      {service.app}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">📞</span>
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

      {/* Emergency Footer (Төтенше жағдайлар ақпараты) */}
      <div className="bg-red-50 border-t border-red-200 p-4">
        <h5 className="font-bold text-red-800 mb-2 text-md">
          {t('transport.emergencyTitle')}
        </h5>
        <div className="text-sm text-red-700 space-y-1">
          <div className="flex items-center">🚑 {t('transport.ambulance')}</div>
          <div className="flex items-center">🚓 {t('transport.police')}</div>
          <div className="flex items-center">🚒 {t('transport.fire')}</div>
        </div>
      </div>
    </div>
  );
};

// ===============================================
// 3. Safety Section Component (Негізгі контент)
// ===============================================

const SafetySection = ({ t, currentLang }) => {
  
  // Safety tips (already separated by language key in the original request)
  const safetyTips = {
    kz: [
      'Әрқашан жеке құжаттарыңызды және дәрі-дәрмектеріңізді өзіңізбен алып жүріңіз',
      'Жергілікті тілдегі негізгі сөздерді үйреніңіз (рахмет, сәлем, көмектесіңіз)',
      'Түнде жалғыз жүрмеңіз, әсіресе жарықтандыруы нашар аудандарда',
      'Жергілікті заңдар мен дәстүрлерге құрметпен қараңыз',
      'Төтенше жағдайлар үшін 112 нөмірін есте сақтаңыз',
      'Суыңызды әрқашан өзіңізбен алып жүріңіз, әсіресе ыстық күндері',
      'Жергілікті көлік ережелерін біліңіз'
    ],
    ru: [
      'Всегда носите с собой личные документы и необходимые лекарства',
      'Выучите основные фразы на местном языке (спасибо, привет, помогите)',
      'Не ходите в одиночку ночью, особенно в плохо освещенных районах',
      'Уважайте местные законы и традиции',
      'Запомните номер экстренной службы 112',
      'Всегда носите с собой воду, особенно в жаркие дни',
      'Изучите местные правила дорожного движения'
    ],
    en: [
      'Always carry your personal documents and necessary medications with you',
      'Learn basic phrases in the local language (thank you, hello, help)',
      'Do not walk alone at night, especially in poorly lit areas',
      'Respect local laws and traditions',
      'Memorize the emergency number 112',
      'Always carry water with you, especially on hot days',
      'Learn local transportation rules'
    ]
  };

  // Get translated contacts and notes from the i18n resources
  const emergencyContacts = t('contacts', currentLang) || resources['kz'].translation.contacts;
  const additionalNotes = t('notes', currentLang) || resources['kz'].translation.notes;

  return (
    <div className="space-y-10 p-4 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{t('safety')}</h1>
        <p className="text-lg text-gray-600">
          {t('mainDescription')}
        </p>
      </div>

      {/* SOS Section */}
      <section className="bg-red-50 rounded-3xl p-8 text-center border-4 border-red-300 shadow-xl">
        <h2 className="text-3xl font-bold text-red-800 mb-6">{t('emergency')}</h2>
        <SOSButton t={t} />
        <div className="mt-6 text-red-700">
          <p className="font-semibold text-lg">
            {t('emergencyText')}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weather Widget */}
        <div className="lg:col-span-1">
          <WeatherWidget t={t} currentLang={currentLang} />
        </div>

        {/* Safety Tips */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">{t('safetyTips')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(safetyTips[currentLang] || []).map((tip, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500 transition-shadow hover:shadow-md">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-md font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-blue-900 font-medium">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl shadow-2xl p-6">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          {t('emergencyContactsTitle')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(emergencyContacts || []).map((contact, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
              <h4 className="font-extrabold text-gray-900 mb-1">{contact.name}</h4>
              <a href={`tel:${contact.number}`} className="text-green-600 font-bold text-xl hover:text-green-700 block mb-2">
                {contact.number}
              </a>
              <p className="text-sm text-gray-600">{contact.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transport Info Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-6">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">{t('transportTitle')}</h3>
        <TransportInfo t={t} currentLang={currentLang} />
      </div>

      {/* Additional Notes */}
      <div className="bg-yellow-50 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-xl">
        <h3 className="text-xl font-bold mb-4 text-yellow-800">
          {t('importantNotesTitle')}
        </h3>

        <ul className="list-disc list-inside space-y-3 text-yellow-700 font-medium">
          {(additionalNotes || []).map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


// ===============================================
// 4. Main Exported Widget (Тілді ауыстыруды қамтитын негізгі компонент)
// ===============================================

const ShymkentSafetyWidget = () => {
  const [currentLang, setCurrentLang] = useState('kz'); // Әдепкі тіл - Қазақша

  // Function to get translation based on current language
  const t = (key) => translate(currentLang, key);

  const changeLanguage = (lng) => {
    setCurrentLang(lng);
  };

  const LangButton = ({ langCode, label }) => (
    <button
      onClick={() => changeLanguage(langCode)}
      className={`px-4 py-2 mx-1 rounded-full font-semibold transition-colors duration-200 shadow-md ${
        currentLang === langCode
          ? 'bg-red-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-100 p-4 antialiased">
      {/* Language Switchers (Тілді ауыстыру батырмалары) */}
      <div className="flex justify-center py-6 bg-white shadow-lg rounded-xl mb-8">
        <LangButton langCode="kz" label="Қазақша" />
        <LangButton langCode="ru" label="Русский" />
        <LangButton langCode="en" label="English" />
      </div>

      {/* Main Safety Content (Негізгі қауіпсіздік контенті) */}
      <SafetySection t={t} currentLang={currentLang} />
    </div>
  );
};

export default ShymkentSafetyWidget;