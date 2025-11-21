// Service Worker for Shymkent Travel Assistant PWA

const CACHE_NAME = 'shymkent-travel-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon.svg',
  '/offline.html'
];

// If running on localhost (dev), attempt to unregister immediately to avoid serving stale cached assets
const IS_DEV = (self.location && (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') ) || ['5173','5174','5000'].includes(self.location.port);
if (IS_DEV) {
  // Try to unregister itself during install/activate
  self.addEventListener('install', (event) => {
    console.log('Service Worker installing in dev - will unregister...');
    event.waitUntil((async () => {
      try {
        await self.skipWaiting();
        await self.registration.unregister();
        console.log('Service Worker unregistered in dev during install.');
      } catch (e) {
        console.warn('SW unregister failed in install:', e);
      }
    })());
  });

  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating in dev - will unregister...');
    event.waitUntil((async () => {
      try {
        await self.clients.claim();
        await self.registration.unregister();
        console.log('Service Worker unregistered in dev during activate.');
      } catch (e) {
        console.warn('SW unregister failed in activate:', e);
      }
    })());
  });
} else {
  // Install event - cache essential files (production behavior)
  self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    // Use resilient caching: fetch each resource and add if successful, instead of failing the whole install
    event.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      const results = await Promise.allSettled(urlsToCache.map(async (url) => {
        try {
          const res = await fetch(url, { cache: 'no-store' });
          if (res.ok) await cache.put(url, res.clone());
          return { url, ok: res.ok };
        } catch (err) {
          return { url, ok: false, err };
        }
      }));

      results.forEach(r => { if (r.status === 'fulfilled' && !r.value.ok) console.warn('Could not cache', r.value.url); });
      await self.skipWaiting();
    })());
  });
}

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Don't attempt to handle non-GET requests via cache (e.g. POSTs)
  if (event.request.method && event.request.method !== 'GET') {
    // Let network handle it directly
    event.respondWith(fetch(event.request).catch(async (err) => {
      console.warn('Network fetch failed for non-GET request:', err);
      const offlineResp = await caches.match('/offline.html');
      return offlineResp || new Response('Service Unavailable', { status: 503 });
    }));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((networkResponse) => {
            // If response is invalid, just return it (e.g., opaque cross-origin),
            // but ensure it's a Response object.
            if (!networkResponse) {
              throw new Error('No response from network');
            }

            // Only cache successful basic responses (same-origin) for GET requests
            if (networkResponse.ok && networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                try {
                  // Use request URL as cache key to avoid passing a POST/Request object
                  cache.put(event.request.url, responseToCache);
                } catch (err) {
                  // Some browsers may reject caching certain request types; ignore gracefully
                  console.warn('Cache put failed for url:', event.request.url, err);
                }
              }).catch((err) => {
                console.warn('Failed to open cache for put:', err);
              });
            }

            return networkResponse;
          });
      })
      .catch(async (err) => {
        console.warn('SW fetch failed:', err);
        // If both cache and network fail, try to respond with offline.html or a minimal Response
        const offlineResp = await caches.match('/offline.html');
        if (offlineResp) return offlineResp;

        // If request expects a document, return a simple offline HTML fallback
        if (event.request.destination === 'document') {
          return new Response('<!doctype html><html><body><h1>Offline</h1><p>Content is not available while offline.</p></body></html>', {
            headers: { 'Content-Type': 'text/html' },
            status: 503,
            statusText: 'Service Unavailable'
          });
        }

        // For other requests return a generic 503 response
        return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

// Periodic background sync for updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-update') {
    console.log('Periodic sync for content updates');
    event.waitUntil(updateContent());
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/icons/explore-icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/close-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    // Sync any pending requests or data
    const cache = await caches.open(CACHE_NAME);
    // Add your background sync logic here
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Content update function
async function updateContent() {
  try {
    // Update cached content
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        // Only attempt to update GET requests
        if (request.method && request.method !== 'GET') continue;
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          try {
            await cache.put(request, networkResponse.clone());
          } catch (err) {
            console.warn(`Failed to cache updated response for ${request.url}:`, err);
          }
        }
      } catch (error) {
        console.warn(`Failed to update ${request.url}:`, error);
      }
    }
    
    console.log('Content update completed');
  } catch (error) {
    console.error('Content update failed:', error);
  }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});