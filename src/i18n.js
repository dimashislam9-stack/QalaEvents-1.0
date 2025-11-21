import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  kz: {
    translation: {
      // Navigation
      home: "Басты бет",
      map: "Карта",
      assistant: "AI Көмекші",
      places: "Орындар",
      safety: "Қауіпсіздік",
      
      // Home Page
      welcome: "Шымкентке қош келдіңіз!",
      description: "Сіздің цифрлық туристік көмекшіңіз",
      features: "Мүмкіндіктер",
      feature1: "Интерактивті карта",
      feature2: "AI көмекші",
      feature3: "Туристік орындар",
      feature4: "SOS қоңырау",
      feature5: "Ауа райы",
      feature6: "Көлік ақпараты",
      
      // Map
      yourLocation: "Сіздің орналасқан жеріңіз",
      popularPlaces: "Танымал орындар",
      directions: "Маршрут",
      openMap: "Картаны ашу",
      
      // Assistant
      askQuestion: "Сұрақ қойыңыз...",
      send: "Жіберу",
      askAssistant: "Көмекшіден сұраңыз",
      examples: "Мысал сұрақтар:",
      example1: "Шымкентте қай жерге баруға болады?",
      example2: "Мен қазір Арбаттамын, қай жаққа барсам болады?",
      example3: "3 сағатта қандай жерлерді көрген дұрыс?",
      
      // Places
      allPlaces: "Барлық орындар",
      description: "Сипаттама",
      touristPlaces: "Туристік орындар",
      
      // Safety
      emergency: "Төтенше жағдай",
      sosButton: "SOS Түймесі",
      call112: "112 нөміріне қоңырау шалу",
      emergencyInfo: "Төтенше жағдай ақпараты",
      safetyTips: "Қауіпсіздік кеңестері",
      weather: "Ауа райы",
      transport: "Көлік",
      sosCall: "SOS қоңырау",
      
      // Statistics
      touristPlacesCount: "Туристік орындар",
      support: "Қолдау",
      languages: "Тілдер",
      emergencyCall: "Төтенше қоңырау",
      
      // Common
      learnMore: "Толығырақ"
    }
  },
  ru: {
    translation: {
      // Navigation
      home: "Главная",
      map: "Карта",
      assistant: "AI Помощник",
      places: "Места",
      safety: "Безопасность",
      
      // Home Page
      welcome: "Добро пожаловать в Шымкент!",
      description: "Ваш цифровой туристический помощник",
      features: "Возможности",
      feature1: "Интерактивная карта",
      feature2: "AI помощник",
      feature3: "Туристические места",
      feature4: "SOS вызов",
      feature5: "Погода",
      feature6: "Транспорт",
      
      // Map
      yourLocation: "Ваше местоположение",
      popularPlaces: "Популярные места",
      directions: "Маршрут",
      openMap: "Открыть карту",
      
      // Assistant
      askQuestion: "Задайте вопрос...",
      send: "Отправить",
      askAssistant: "Спросить помощника",
      examples: "Примеры вопросов:",
      example1: "Куда можно сходить в Шымкенте?",
      example2: "Я сейчас на Арбате, куда можно пойти?",
      example3: "Какие места можно посмотреть за 3 часа?",
      
      // Places
      allPlaces: "Все места",
      description: "Описание",
      touristPlaces: "Туристические места",
      
      // Safety
      emergency: "Чрезвычайная ситуация",
      sosButton: "SOS Кнопка",
      call112: "Позвонить по номеру 112",
      emergencyInfo: "Информация о ЧС",
      safetyTips: "Советы по безопасности",
      weather: "Погода",
      transport: "Транспорт",
      sosCall: "SOS вызов",
      
      // Statistics
      touristPlacesCount: "Туристические места",
      support: "Поддержка",
      languages: "Языки",
      emergencyCall: "Экстренный вызов",
      
      // Common
      learnMore: "Узнать больше"
    }
  },
  en: {
    translation: {
      // Navigation
      home: "Home",
      map: "Map",
      assistant: "AI Assistant",
      places: "Places",
      safety: "Safety",
      
      // Home Page
      welcome: "Welcome to Shymkent!",
      description: "Your digital travel assistant",
      features: "Features",
      feature1: "Interactive Map",
      feature2: "AI Assistant",
      feature3: "Tourist Places",
      feature4: "SOS Call",
      feature5: "Weather",
      feature6: "Transport Info",
      
      // Map
      yourLocation: "Your Location",
      popularPlaces: "Popular Places",
      directions: "Directions",
      openMap: "Open Map",
      
      // Assistant
      askQuestion: "Ask a question...",
      send: "Send",
      askAssistant: "Ask Assistant",
      examples: "Example questions:",
      example1: "Where can I go in Shymkent?",
      example2: "I am at Arbat now, where can I go?",
      example3: "What places can I see in 3 hours?",
      
      // Places
      allPlaces: "All Places",
      description: "Description",
      touristPlaces: "Tourist Places",
      
      // Safety
      emergency: "Emergency",
      sosButton: "SOS Button",
      call112: "Call 112",
      emergencyInfo: "Emergency Information",
      safetyTips: "Safety Tips",
      weather: "Weather",
      transport: "Transport",
      sosCall: "SOS Call",
      
      // Statistics
      touristPlacesCount: "Tourist Places",
      support: "Support",
      languages: "Languages",
      emergencyCall: "Emergency Call",
      
      // Common
      learnMore: "Learn More"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'kz',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;