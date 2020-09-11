var cacheName = 'cache-v1'
var filesToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/style.css',
    '/app.js',
    '/icon-72x72.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;1,200;1,300&display=swap',
    'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ccfde6a08986eb9eb566024d9005c2b1',
    'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
]
const self = this
//installation of SW
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('Open catche')
            return cache.addAll(filesToCache)
        })
    )
})

//Listening for request 
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return fetch(e.request).catch(() => caches.match('offline.html'))
            return response || fetch(e.request).catch(() => caches.match('offline.html'))
        })
    )
})

//Activate Sw
self.addEventListener('activate', (event) => {
    const cachesWhiteList = []
    cachesWhiteList.push(cacheName)
    console.log('active')
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(

            cacheNames.map((cacheName) => {
                if (!cachesWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })

        ))
    )
})