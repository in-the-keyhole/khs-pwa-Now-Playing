//search params can be passed in from register function in /src/index.js
const search = self.location.search.substr(1).toLowerCase();
const params = search.split('&');

//if exactly 'pwa=1' appears in the search params, allow PWA functionality
const PWA = params.includes('pwa=1');

//check for a cache name in search params
//if not present, default to 'nowPlaying-V1'
let cName = null;
const cacheParam = params.find(p => p.includes('cache_name='));
if (cacheParam) {
	cName = cacheParam.split('cache_name=')[1];
}
const cacheName = cName ? 'nowPlaying-'+cName : 'nowPlaying-V1';

//populate this array to cache assets upon initial load
const contentToCache = [
	// '/images/posters/nHXiMnWUAUba2LZ0dFkNDVdvJ1o.jpg',
	// '/images/posters/gri0DDxsERr6B2sOR1fGLxLpSLx.jpg',
	// '/images/posters/h6O5OE3ueRVdCc7V7cwTiQocI7D.jpg',
	// '/images/posters/u7igWoek5Xckz7mkIorYE5pMusI.jpg',
	// '/images/posters/z4x0Bp48ar3Mda8KiPD1vwSY3D8.jpg',
	// '/images/posters/xfWac8MTYDxujaxgPVcRD9yZaul.jpg',
	// '/images/posters/tgfRDJs5PFW20Aoh1orEzuxW8cN.jpg',
	// '/images/posters/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg',
	// '/images/posters/5qVD5TD1CiALR5vUsMzh2BschVU.jpg',
	// '/images/posters/l9BWPqUV57X5ELBDLlbO7Vhh3Mr.jpg',
	// '/images/posters/oFOG2yIRcluKfTtYbzz71Vj9bgz.jpg',
	// '/images/posters/mWOotrG1MMKP9iCy2uPepbu27jk.jpg',
	// '/images/posters/jDeDRLEa8JqB3xmKVy6q3bkmDt6.jpg',
	// '/images/posters/bndiUFfJxNd2fYx8XO610L9a07m.jpg',
	// '/images/posters/cW85VlHPm3pz0anupAXHL9eTh5b.jpg',
	// '/images/posters/39ia8d9HPZlnYuEX5w2Gk25Tpgs.jpg',
	// '/images/posters/9Moizj8qxcZK6DqEE1MTO3pQAEw.jpg',
	// '/images/posters/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg',
	// '/images/posters/nzXzLFTnd0Zb3ExfhOxlQgizgSu.jpg',
	// '/images/posters/3Kr9CIIMcXTPlm6cdZ9y3QTe4Y7.jpg',
];

//any request url that should not be cached
const cacheBlacklist = [
	'/favicon.ico',
	'graphql'
	//'/api/nowPlaying'
];

if (PWA) {
	// Installing Service Worker
	self.addEventListener('install', (e) => {
		console.log('[Service Worker] Install');
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
	    	console.log(`[Service Worker] Fetching cached resource: ${e.request.url}`);
				return r;
			}
			const response = await fetch(e.request);
			if (!cacheBlacklist.find(url => e.request.url.endsWith(url)) ) {
				const cache = await caches.open(cacheName);
				console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
				cache.put(e.request, response.clone());
			} else {
				console.log(`[Service Worker] Do not cache new resource: ${e.request.url}`);
			}
			return response;
		})());
	});


	self.addEventListener('activate', (event) => {
		console.log("[Service Worker] Deleting old caches...");
		event.waitUntil(deleteOldCaches());
	});

}

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