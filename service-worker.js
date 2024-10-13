const CACHE_NAME = 'panificadora-bacanga-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/logo.png',
    '/icon.png',
    '/icon-large.png',
    '/manifest.json',
    '/favicon-48x48.png',
    '/favicon.svg',
    '/favicon.ico',
    '/apple-touch-icon.png'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Arquivos em cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Interceptação de requisições e busca no cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
