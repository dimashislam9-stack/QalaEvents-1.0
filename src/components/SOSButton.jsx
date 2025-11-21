import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SOSButton = () => {
  const { t } = useTranslation();
  const [isCalling, setIsCalling] = useState(false);

  const handleSOSCall = () => {
    if (window.confirm(
      t('language') === 'kz' 
        ? '112 нөміріне қоңырау шалуға сенімдісіз бе?'
        : t('language') === 'ru'
        ? 'Вы уверены, что хотите позвонить по номеру 112?'
        : 'Are you sure you want to call 112?'
    )) {
      setIsCalling(true);
      // Simulate call - in real app this would use tel: protocol
      setTimeout(() => {
        alert(
          t('language') === 'kz'
            ? '112 қызметіне қоңырау шабылды. Көмек жолдамасы!'
            : t('language') === 'ru'
            ? 'Вызов службы 112 выполнен. Помощь в пути!'
            : '112 service called. Help is on the way!'
        );
        setIsCalling(false);
      }, 2000);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleSOSCall}
        disabled={isCalling}
        className="sos-button text-white font-bold py-6 px-12 rounded-full text-2xl shadow-2xl transform transition-transform hover:scale-105 disabled:opacity-50"
      >
        {isCalling ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <span>
              {t('language') === 'kz' ? 'Қоңырау...' : 
               t('language') === 'ru' ? 'Звонок...' : 'Calling...'}
            </span>
          </div>
        ) : (
          'SOS - 112'
        )}
      </button>
      <p className="mt-4 text-sm text-gray-600">
        {t('call112')}
      </p>
    </div>
  );
};

export default SOSButton;