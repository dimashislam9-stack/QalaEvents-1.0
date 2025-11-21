import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { registerSW } from './registerSW.js'

// If we're running in dev (localhost:5173 or 5000), attempt to unregister any service workers
if (typeof window !== 'undefined') {
  const port = window.location.port;
  if (window.location.hostname === 'localhost' || port === '5173' || port === '5000') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach(r => r.unregister().catch(() => {}));
      }).catch(() => {});
      if ('caches' in window) {
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).catch(() => {});
      }
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// PWA Service Worker registration (will skip in dev)
registerSW();