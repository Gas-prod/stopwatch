importScripts("/stopwatch/sw-toolbox.js");
toolbox.precache([
    "/stopwatch/index.html", 
    "/stopwatch/style.css",
    "/stopwatch/script.js",
    "/stopwatch/img/icon/512x512.png", 
    "/stopwatch/img/icon/256x256.png",
    "/stopwatch/img/icon/192x192.png",
    "/stopwatch/img/icon/128x128.png",
    "/stopwatch/img/icon/icon.svg",
])

toolbox.router.get("/*", toolbox.networkFirst, {
    networkTimeoutSeconds: 5
})