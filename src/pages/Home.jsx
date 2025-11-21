import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '🗺️',
      title: t('feature1'),
      description: t('language') === 'kz' ? 'Интерактивті карта арқылы Шымкенттің барлық танымал орындарын табыңыз'
        : t('language') === 'ru' ? 'Найдите все популярные места Шымкента с помощью интерактивной карты'
        : 'Find all popular places in Shymkent with interactive map',
      link: '/map'
    },
    {
      icon: '🤖',
      title: t('feature2'),
      description: t('language') === 'kz' ? 'AI көмекші сізге жол сұрақтарына жауап береді және ұсыныстар береді'
        : t('language') === 'ru' ? 'AI помощник ответит на ваши вопросы и даст рекомендации'
        : 'AI assistant will answer your travel questions and give recommendations',
      link: '/assistant'
    },
    {
      icon: '🏛️',
      title: t('feature3'),
      description: t('language') === 'kz' ? 'Шымкенттегі барлық танымал туристік орындардың тізімі'
        : t('language') === 'ru' ? 'Список всех популярных туристических мест в Шымкенте'
        : 'List of all popular tourist places in Shymkent',
      link: '/places'
    },
    {
      icon: '🚨',
      title: t('feature4'),
      description: t('language') === 'kz' ? 'Төтенше жағдайларда бір басумен 112 нөміріне қоңырау шалу'
        : t('language') === 'ru' ? 'Экстренный вызов 112 одним нажатием в чрезвычайных ситуациях'
        : 'One-tap emergency call to 112 in critical situations',
      link: '/safety'
    },
    {
      icon: '🌤️',
      title: t('feature5'),
      description: t('language') === 'kz' ? 'Ағымдағы және болжалды ауа райы ақпараты'
        : t('language') === 'ru' ? 'Текущая и прогнозируемая погода'
        : 'Current and forecasted weather information',
      link: '/safety'
    },
    {
      icon: '🚌',
      title: t('feature6'),
      description: t('language') === 'kz' ? 'Автобус маршруттары және такси сервистері'
        : t('language') === 'ru' ? 'Автобусные маршруты и сервисы такси'
        : 'Bus routes and taxi services',
      link: '/safety'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('welcome')}</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">{t('description')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/map"
            className="bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            {t('language') === 'kz' ? 'Картаны ашу' : 
             t('language') === 'ru' ? 'Открыть карту' : 'Open Map'}
          </Link>
          <Link
            to="/assistant"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-green-600 transition-colors"
          >
            {t('language') === 'kz' ? 'Көмекшіге сұрау' : 
             t('language') === 'ru' ? 'Спросить помощника' : 'Ask Assistant'}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{t('features')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="mt-4 text-green-500 font-medium flex items-center">
                {t('language') === 'kz' ? 'Толығырақ' : 
                 t('language') === 'ru' ? 'Подробнее' : 'Learn more'}
                <span className="ml-2">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-gray-800 text-white rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-400">50+</div>
            <div className="text-gray-300">
              {t('language') === 'kz' ? 'Туристік орындар' : 
               t('language') === 'ru' ? 'Туристических мест' : 'Tourist Places'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">24/7</div>
            <div className="text-gray-300">
              {t('language') === 'kz' ? 'Қолдау көрсету' : 
               t('language') === 'ru' ? 'Поддержка' : 'Support'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">3</div>
            <div className="text-gray-300">
              {t('language') === 'kz' ? 'Тілдер' : 
               t('language') === 'ru' ? 'Языка' : 'Languages'}
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">112</div>
            <div className="text-gray-300">
              {t('language') === 'kz' ? 'Төтенше қоңырау' : 
               t('language') === 'ru' ? 'Экстренный вызов' : 'Emergency Call'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;