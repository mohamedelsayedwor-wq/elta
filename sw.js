const CACHE_NAME = "studydesk-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"
];


/* =========================
   INSTALL
========================= */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    // يخلي النسخة الجديدة تستلم فورًا
    self.skipWaiting();

});


/* =========================
   ACTIVATE
========================= */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(names => {

                return Promise.all(

                    names
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))

                );

            })
            .then(() => {

                // السيطرة على كل الصفحات المفتوحة
                return self.clients.claim();

            })

    );

});


/* =========================
   FETCH
========================= */

self.addEventListener("fetch", event => {

    // نهتم فقط بطلبات GET
    if (event.request.method !== "GET") {
        return;
    }


    event.respondWith(

        fetch(event.request)

            .then(response => {

                // لو جاب النسخة الجديدة من الإنترنت
                // نحفظها في الكاش

                if (
                    response &&
                    response.status === 200
                ) {

                    const responseClone =
                        response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {

                            cache.put(
                                event.request,
                                responseClone
                            );

                        });

                }

                return response;

            })

            .catch(() => {

                // لو مفيش إنترنت استخدم النسخة المحفوظة

                return caches.match(
                    event.request
                );

            })

    );

});