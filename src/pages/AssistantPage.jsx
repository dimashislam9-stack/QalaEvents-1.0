import React from 'react';
import { useTranslation } from 'react-i18next';
import Assistant from '../components/Assistant';

const AssistantPage = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('assistant')}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {currentLanguage === 'kz' 
            ? 'AI көмекші сізге Шымкенттегі саяхатыңызда көмектеседі'
            : currentLanguage === 'ru'
            ? 'AI помощник поможет вам в путешествии по Шымкенту'
            : 'AI assistant will help you in your journey through Shymkent'
          }
        </p>
      </div>

      {/* Main Assistant Component */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <Assistant />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Questions Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">❓</span>
            </div>
            <h3 className="text-2xl font-bold text-green-800">
              {currentLanguage === 'kz'
                ? 'Қандай сұрақтар қоя аласыз:'
                : currentLanguage === 'ru'
                ? 'Какие вопросы можно задавать:'
                : 'What questions you can ask:'
              }
            </h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">•</span>
              <span className="text-green-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Туристік орындар туралы ақпарат'
                  : currentLanguage === 'ru'
                  ? 'Информация о туристических местах'
                  : 'Information about tourist places'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">•</span>
              <span className="text-green-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Жол бағыттары және маршруттар'
                  : currentLanguage === 'ru'
                  ? 'Направления и маршруты'
                  : 'Directions and routes'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">•</span>
              <span className="text-green-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Кәдесый дүкендері және ресторандар'
                  : currentLanguage === 'ru'
                  ? 'Сувенирные магазины и рестораны'
                  : 'Souvenir shops and restaurants'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">•</span>
              <span className="text-green-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Қауіпсіздік кеңестері'
                  : currentLanguage === 'ru'
                  ? 'Советы по безопасности'
                  : 'Safety tips'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">•</span>
              <span className="text-green-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Көрнекті орындарға бағдарлама'
                  : currentLanguage === 'ru'
                  ? 'Программа по достопримечательностям'
                  : 'Itinerary for attractions'
                }
              </span>
            </li>
          </ul>
        </div>

        {/* Features Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold text-blue-800">
              {currentLanguage === 'kz'
                ? 'Көмекші туралы:'
                : currentLanguage === 'ru'
                ? 'О помощнике:'
                : 'About the assistant:'
              }
            </h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span className="text-blue-800 text-lg">
                {currentLanguage === 'kz'
                  ? '24/7 жұмыс істейді'
                  : currentLanguage === 'ru'
                  ? 'Работает 24/7'
                  : 'Works 24/7'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span className="text-blue-800 text-lg">
                {currentLanguage === 'kz'
                  ? '3 тілде жауап береді'
                  : currentLanguage === 'ru'
                  ? 'Отвечает на 3 языках'
                  : 'Answers in 3 languages'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span className="text-blue-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Жергілікті білімі бар'
                  : currentLanguage === 'ru'
                  ? 'Имеет местные знания'
                  : 'Has local knowledge'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span className="text-blue-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Тегін қолдау'
                  : currentLanguage === 'ru'
                  ? 'Бесплатная поддержка'
                  : 'Free support'
                }
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">•</span>
              <span className="text-blue-800 text-lg">
                {currentLanguage === 'kz'
                  ? 'Жылдам және дәл жауаптар'
                  : currentLanguage === 'ru'
                  ? 'Быстрые и точные ответы'
                  : 'Fast and accurate responses'
                }
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Example Questions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
        <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
          {currentLanguage === 'kz'
            ? 'Мысал сұрақтар:'
            : currentLanguage === 'ru'
            ? 'Примеры вопросов:'
            : 'Example questions:'
          }
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100">
            <p className="text-purple-700 text-center">
              {currentLanguage === 'kz'
                ? 'Шымкентте қай жерге баруға болады?'
                : currentLanguage === 'ru'
                ? 'Куда можно сходить в Шымкенте?'
                : 'Where can I go in Shymkent?'
              }
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100">
            <p className="text-purple-700 text-center">
              {currentLanguage === 'kz'
                ? '3 сағатта қандай жерлерді көруге болады?'
                : currentLanguage === 'ru'
                ? 'Какие места можно посмотреть за 3 часа?'
                : 'What places can I see in 3 hours?'
              }
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-purple-100">
            <p className="text-purple-700 text-center">
              {currentLanguage === 'kz'
                ? 'Қазір Арбаттамын, қайда баруға болады?'
                : currentLanguage === 'ru'
                ? 'Я сейчас на Арбате, куда можно пойти?'
                : 'I am at Arbat now, where can I go?'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;