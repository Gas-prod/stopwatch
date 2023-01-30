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
    "https://fonts.googleapis.com/css2?family=family=Sora:wght@400;700&family=Share+Tech+Mono&display=swap",
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    "/stopwatch/nosleep.js"
])

toolbox.router.get("/*", toolbox.networkFirst, {
    networkTimeoutSeconds: 5
})