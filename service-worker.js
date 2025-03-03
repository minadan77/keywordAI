self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/icon.png',  // Asegúrate de que este archivo existe en tu proyecto
                '/manifest.json',
                '/service-worker.js'
            ]).catch((error) => {
                console.error('Error al añadir archivos a la caché:', error);
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
