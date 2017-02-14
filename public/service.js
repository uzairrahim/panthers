var cache_name = 'atx-panthers-cache-v1';
var cached_assets = ['./img/logo.png', './img/favicon.png', './js/avatar.svg'];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(cache_name)
		.then(function(cache){
			console.log(cache);
			return cache.addAll(cached_assets);
		})
	);
});

self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response) return response;
			return fetch(event.request);
		})
	);
});

self.addEventListener('push', function(event){
	console.log('Push received with:', event);

	var title = 'Panthers Cricket'
	var options = {
		body : event.data.text(),
		icon : './img/logo.png',
		badge : './img/logo.png',
		vibrate : [200, 100, 200, 100, 200, 100, 400],
		tag : 'request'
	}

	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event){
	console.log(event);
	event.notification.close();
});