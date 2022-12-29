importScripts("/stopwatch/sw-toolbox.js");
toolbox.precache([
    "/stopwatch/index.html", 
    "/stopwatch/style.css",
    "/stopwatch/script.js",
    "/stopwatch/icon/512x512.png", 
    "/stopwatch/icon/256x256.png",
    "/stopwatch/icon/192x192.png",
    "/stopwatch/icon/128x128.png",
    "/stopwatch/icon/icon.svg",
])

toolbox.router.get("/*", toolbox.networkFirst, {
    networkTimeoutSeconds: 5
})