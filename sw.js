importScripts("/stopwatch/sw-toolbox.js");
toolbox.precache([
    "/stopwatch/index.html", 
    "/stopwatch/style.css",
    "/stopwatch/script.js",
    "/stopwatch/img/icons/512x512.png", 
    "/stopwatch/img/icons/256x256.png",
    "/stopwatch/img/icons/192x192.png",
    "/stopwatch/img/icons/128x128.png",
    "/stopwatch/img/icons/icon.svg",
])

toolbox.router.get("/*", toolbox.networkFirst, {
    networkTimeoutSeconds: 5
})