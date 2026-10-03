const CACHE_NAME =
"city4christ-v2";


const APP_FILES = [

    "./",

    "./index.html",

    "./home.html",

    "./community.html",

    "./prayer.html",

    "./messages.html",

    "./word.html",

    "./profile.html",

    "./events.html",

    "./pastor-booking.html",

    "./notifications.html",

    "./settings.html",

    "./css/index.css",

    "./css/style.css",

    "./css/home.css",

    "./css/community.css",

    "./css/prayer.css",

    "./css/messages.css",

    "./css/word.css",

    "./css/profile.css",

    "./css/events.css",

    "./css/pastor-booking.css",

    "./css/notifications.css",

    "./css/settings.css",

    "./css/animation.css",

    "./js/app.js",

    "./assets/images/logo.jpeg",

    "./assets/images/banner.jpeg",

    "./assets/images/pastorPhoto.jpeg",

    "./assets/images/maleMember.jpeg",

    "./assets/images/femaleMember.jpeg",

    "./assets/images/familyMember.jpeg",

    "./assets/images/youthWorship.jpeg",

    "./assets/images/churchActivities.jpeg"

];



/* INSTALL */

self.addEventListener(
"install",
event => {

    event.waitUntil(

        caches
        .open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(
                APP_FILES
            );

        })

    );

    self.skipWaiting();

});



/* ACTIVATE */

self.addEventListener(
"activate",
event => {

    event.waitUntil(

        caches.keys()

        .then(cacheNames => {

            return Promise.all(

                cacheNames.map(
                    cacheName => {

                        if(
                            cacheName
                            !== CACHE_NAME
                        ){

                            return caches.delete(
                                cacheName
                            );

                        }

                    }
                )

            );

        })

    );

    self.clients.claim();

});



/* FETCH */

self.addEventListener(
"fetch",
event => {

    if(
        event.request.method
        !== "GET"
    ){

        return;

    }


    event.respondWith(

        caches.match(
            event.request
        )

        .then(cachedResponse => {

            if(cachedResponse){

                return cachedResponse;

            }


            return fetch(
                event.request
            )

            .then(networkResponse => {

                const responseClone =
                networkResponse.clone();


                caches
                .open(CACHE_NAME)

                .then(cache => {

                    cache.put(
                        event.request,
                        responseClone
                    );

                });


                return networkResponse;

            })

            .catch(() => {

                if(
                    event.request.mode
                    === "navigate"
                ){

                    return caches.match(
                        "./index.html"
                    );

                }

            });

        })

    );

});