const CACHE_NAME = 'panificadora-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/favicon-48x48.png',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/logo.png' // Adicione a logo ao cache
];

// Instalando o Service Worker e fazendo cache dos arquivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Buscando arquivos do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
