//search params can be passed in from register function in /src/index.js
const search = self.location.search.substr(1).toLowerCase();
const params = search.split('&');

//if exactly 'pwa=1' appears in the search params, allow PWA functionality
const PWA = params.includes('pwa=1');

//check for a cache name in search params
//if not present, default to 'nowPlaying-V1'
let cName = '';
const cacheParam = params.find(p => p.includes('cache_name='));
if (cacheParam) {
	cName = cacheParam.split('cache_name=')[1];
}
const cacheName = cName ? 'nowPlaying-'+cName : 'nowPlaying-V1';

//populate this array to cache assets upon initial load
const contentToCache = [
	'index.html',
	'./', // Alias for index.html
];

//any request url that should not be cached
const cacheBlacklist = [
	'/favicon.ico',
	'/login',
	'graphql',
	'/users.json'
];

if (PWA) {
	// Installing Service Worker
	self.addEventListener('install', (e) => {
		console.log(`[Service Worker] Install ${cacheName}`);
		deleteOldCaches();
		e.waitUntil((async () => {
			const cache = await caches.open(cacheName);
			console.log('[Service Worker] Caching all: app and content', contentToCache);
			await cache.addAll(contentToCache);
		})());
	});

	// Fetching content using Service Worker
	self.addEventListener('fetch', (e) => {
		e.respondWith((async () => {
			const r = await caches.match(e.request);
			if (r) {
				console.log(`[Service Worker] Fetching cached ${cacheName} resource: ${e.request.url}`);
				return r;
			}
			try {
				const response = await fetch(e.request);
				if (!cacheBlacklist.find(url => e.request.url.endsWith(url)) ) {
					const cache = await caches.open(cacheName);
					console.log(`[Service Worker] Caching new ${cacheName} resource: ${e.request.url}`);
					cache.put(e.request, response.clone());
				} else {
					console.log(`[Service Worker] Do not cache new ${cacheName} resource: ${e.request.url}`);
				}
				return response;
			} catch(err) {
				console.log(`[Service Worker] ${cacheName} fetch error, request:`, e.request.url);
				return false;
			}
		})());
	});


	self.addEventListener('activate', async (e) => {
		console.log("[Service Worker] Deleting old caches...");
		e.waitUntil(deleteOldCaches());

		try {
			const options = {}
			const subscription = await self.registration.pushManager.subscribe(options)
			console.log("[Service Worker] Activate subcription:", JSON.stringify(subscription));
		} catch (err) {
			console.log("[Service Worker] Activate subcription error", err)
		}
	});

	self.addEventListener('push', (e) => {
		console.log("[Service Worker] Received push notification", e);
		if (e && e.data) {
			console.log("Received push event data: "+e.data.text());
			console.log("Self Registration", self.registration);

			const options = {
				body: e.data.text(),
				icon: "/images/icons/icon-32.png",
			};
			self.registration.showNotification("NP Notif! "+options.body, options);
		} else {
			console.log("Received push event but no data");
		}
	});
}

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");
	const rawData = atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

const deleteCache = async key => {
	console.log("[Service Worker] Deleting cache: "+key);
	await caches.delete(key)
}

const deleteOldCaches = async () => {
	const cacheKeepList = [cacheName];
	const keyList = await caches.keys();
	console.log(`[Service Worker] Current cache: ${cacheName}, KeyList: `, keyList);
	const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
	await Promise.all(cachesToDelete.map(deleteCache));
}