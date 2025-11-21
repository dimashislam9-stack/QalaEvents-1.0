export function registerSW() {
  // Don't register service worker in development (local dev with Vite)
  if ('serviceWorker' in navigator) {
    const hostname = window.location.hostname;
    const port = window.location.port;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || port === '5173' || port === '5000';
    if (isLocalhost) {
      console.log('Service worker registration skipped in development environment.');

      // Additionally attempt to unregister any previously registered service workers to avoid cached assets
      (async () => {
        try {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const r of regs) {
            try {
              await r.unregister();
              console.log('Unregistered service worker:', r);
            } catch (e) {
              console.warn('Failed to unregister SW:', e);
            }
          }

          // Also try to clear the SW-related caches used by our app
          if ('caches' in window) {
            const keys = await caches.keys();
            for (const key of keys) {
              try {
                await caches.delete(key);
                console.log('Deleted cache:', key);
              } catch (e) {
                console.warn('Failed to delete cache', key, e);
              }
            }
          }
        } catch (err) {
          console.warn('Error while cleaning up service workers/caches:', err);
        }
      })();

      return;
    }

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}