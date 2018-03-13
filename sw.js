let version = "1.05";
let cacheName = "restaurant_reviews-" + version;


let allCaches = [
  "/",
  "/index.html",
  "/restaurant.html",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/css/responsive.css",
  "/css/styles.css",
  "/img",
];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
/* installing SW */
self.addEventListener('install', function(event){
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log('[ServiceWorker] Caching');
      return cache.addAll(allCaches);
    })
  );
});

/* remove the old one */
self.addEventListener('activate', function(event) {
  let cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
