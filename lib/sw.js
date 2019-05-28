self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('wordcube').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/lib/bundle.js',
        '/assets/css/style.css'
      ]);
    })
  );
 });

 self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
 });
 
