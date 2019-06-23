// let staticCacheName = 'restaurant-static-v1';

// self.addEventListener('install', function(event) {
// 	event.waitUntil(
// 		caches.open(staticCacheName).then(function(cache) {
// 			return cache.addAll([
// 				'./',
// 				'./index.html',
// 				'./restaurant.html',
// 				'./css/styles.css',
// 				'./data/restaurants.json',
// 				'./js/dbhelper.js',
// 				'./js/main.js',
// 				'./js/restaurant_info.js',
// 				'./img/1.jpg', 
// 				'./img/2.jpg',
// 				'./img/3.jpg',
// 				'./img/4.jpg',
// 				'./img/5.jpg',
// 				'./img/6.jpg',
// 				'./img/7.jpg',
// 				'./img/8.jpg',
// 				'./img/9.jpg',
// 				'./img/10.jpg',
//              './sw_register.js',
// 			]);
// 		})
// 	);
// });

// self.addEventListener('activate', function(event) {
// 	event.waitUntil(
// 		caches.keys()
// 		.then(function(cacheNames) {
// 			return Promise.all(
// 				cacheNames.filter(function(cacheName) {
// 					return cacheName.startsWith('restaurant-') &&
// 						   cacheName != staticCacheName;
// 				}).map(function(cacheName) {
// 					return caches.delete(cacheName);
// 				})
// 			);
// 		})
// 	);
// })

// self.addEventListener('fetch', function(event) {
// 	event.respondWith(
// 		caches.match(event.request)
// 		.then(function(response) {
// 			return response || fetch(event.request);
// 		})
// 	);
// });

//--------------------------------------------------

self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open('v1')
        .then(function(cache){
            return cache.addAll(cacheFiles)
        })
    );
})

const cacheFiles=[
  './',
  'index.html',
  'restaurant.html',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
  './css/styles.css',
  './js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './sw_register.js',
];


self.addEventListener('fetch', function(e){
    //to prevent the default fetch event
    e.respondWith(
        caches.match(e.request)
        .then(function(response){
            if(response){
                console.log('Found', e.request,   'in cache!!');
                return response;
            } else {
                console.log('Couldn not find', e.request, 'in cache, Fetching..');
                return fetch(e.request)
                .then(function(response){
                    const clonedResponse = response.clone();
                    caches.open('v1').then(function(cache){
                        cache.put(e.request, clonedResponse)
                    })
                    return response;
                })
                .catch(function(err){
                    console.log(err)
                })
            }
        })
    );
});


