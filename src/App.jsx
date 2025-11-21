import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Header from './components/Header';
import Home from './pages/Home';
import Map from './pages/Map';
import AssistantPage from './pages/AssistantPage';
import Places from './pages/Places';
import PlaceDetail from './pages/PlaceDetail';
import Safety from './pages/Safety';
import HeroSlider from './components/HeroSlider';
import './styles/index.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          {/* HeroSlider тек басты бетте көрсетіледі */}
          <Routes>
            <Route path="/" element={
              <>
                <HeroSlider />
                <Home />
              </>
            } />
            <Route path="/map" element={<Map />} />
            <Route path="/assistant" element={<AssistantPage />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/:id" element={<PlaceDetail />} />
            <Route path="/safety" element={<Safety />} />
          </Routes>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;