import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/map', label: t('map') },
    { path: '/assistant', label: t('assistant') },
    { path: '/places', label: t('places') },
    { path: '/safety', label: t('safety') }
  ];

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-green-600">Shymkent Travel</h1>
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <LanguageSwitcher />
        </div>
        
        {/* Mobile Navigation */}
        <nav className="md:hidden flex overflow-x-auto py-2 space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                location.pathname === item.path
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;