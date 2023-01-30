const clockBtn = document.getElementById("clock-button")
const timerBtn = document.getElementById("timer-button")

const startStopBtn = document.getElementById("start-stop")
const resetBtn = document.getElementById("reset")

const clockRotateBtn = document.getElementById("clock-rotate-button")
const timerRotateBtn = document.getElementById("timer-rotate-button")

const clockFullscreenBtn = document.getElementById("clock-fullscreen-button")
const timerFullscreenBtn = document.getElementById("timer-fullscreen-button")

const ThemeSwitcher = document.getElementById("theme-switcher")

const clockBox = document.getElementById("clock-container")
const timerBox = document.getElementById("timer-container")

const dateText = document.getElementById("date-text")
const minDateText = document.getElementById("min-date")

const timerText = document.getElementById("timer-text")

let mode = "clock"
let rotateMode = "portrait"
let isFullscreen = false
let theme
let darkVars = {
    bgColor: "#000000",
    objectColor: "#1B1D23",
    textColor: "#DDEBF8",
    primaryColor: "#0049F5",
    primaryButtonColor: "#DDEBF8",
    borderColor: "rgba(221, 235, 248, 0.4)",
    shadow: "0 0 0 transparent"
}
let lightVars = {
    bgColor: "#ffffff",
    objectColor: "#DDEBF8",
    textColor: "#272932",
    primaryColor: "#0049F5",
    primaryButtonColor: "#DDEBF8",
    borderColor: "rgba(39, 41, 50, 0.4)",
    shadow: "0 0 20px rgba(0, 73, 245, 0.2)"
}

let touchStart = {x: 0, y: 0}
let touchEnd = {x: 0, y: 0}


if (window.matchMedia("(prefers-color-scheme: dark)").matches){
    theme = "dark"

    ThemeSwitcher.innerHTML = '<span class="material-symbols-rounded">light_mode</span>'
}else{
    theme = "light"

    ThemeSwitcher.innerHTML = '<span class="material-symbols-rounded">dark_mode</span>'
}

let date = new Date()

let timer = {
    isActive: false,
    time: 0
}

let timerInterval

// complete numbers with a 0
function twoNumbers(n){
    return (n < 10) ? "0" + n : n
}

// refresh the actual date
function showDates(){
    date = new Date

    let hours = twoNumbers(date.getHours())
    let minutes = twoNumbers(date.getMinutes())
    let seconds = twoNumbers(date.getSeconds())

    // on the clock
    dateText.innerHTML = `${hours}:${minutes}:${seconds}`

    // on the timer
    minDateText.innerHTML = `${hours}h ${minutes}min`
}

// show the timer
function showTimer(){
    const hours = twoNumbers(Math.floor(timer.time / 3600))
    const minutes = twoNumbers(Math.floor((timer.time % 3600) / 60))
    const seconds = twoNumbers(timer.time % 60)

    timerText.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function startStop(){
    if (timer.isActive){
        // stop the timer
        clearInterval(timerInterval)
        timer.isActive = false

        // switch start button on stop
        startStopBtn.innerHTML = '<span class="material-symbols-rounded">play_arrow</span>'
    }else{
        // start the timer
        timerInterval = setInterval(function(){
            timer.time += 1

            showTimer()
        }, 1000)
        timer.isActive = true

        // switch stop button on start
        startStopBtn.innerHTML = '<span class="material-symbols-rounded">pause</span>'
    }
}

// reset the timer
function resetTimer(){
    timer.time = 0
    showTimer()
}

// rotate the timer and the clock in portrait or in landscape mode
function rotate(){
    let o = (rotateMode == "portrait") ? "landscape" : "portrait"

    let selectMargin = (rotateMode == "portrait") ? "24px" : "80px"

    // change the button icon
    clockRotateBtn.innerHTML = `<span class="material-symbols-rounded">stay_current_${rotateMode}</span>`
    timerRotateBtn.innerHTML = `<span class="material-symbols-rounded">stay_current_${rotateMode}</span>`

    // change the select margin-bottom
    document.querySelector(".select").style.marginBottom = selectMargin

    // rotate
    clockBox.classList.add(o)
    clockBox.classList.remove(rotateMode)
    timerBox.classList.add(o)
    timerBox.classList.remove(rotateMode)

    rotateMode = o
}

function fullscreen(box){
    if (isFullscreen && rotateMode == "landscape"){
        isFullscreen = false

        clockFullscreenBtn.innerHTML = '<span class="material-symbols-rounded">fullscreen</span>'
        timerFullscreenBtn.innerHTML = '<span class="material-symbols-rounded">fullscreen</span>'

        box.classList.remove("fullscreen")
    }else if(rotateMode == "landscape"){
        isFullscreen = true

        clockFullscreenBtn.innerHTML = '<span class="material-symbols-rounded">fullscreen_exit</span>'
        timerFullscreenBtn.innerHTML = '<span class="material-symbols-rounded">fullscreen_exit</span>'

        box.classList.add("fullscreen")
    }
}

function changeTheme(){
    ThemeSwitcher.innerHTML = `<span class="material-symbols-rounded">${theme}_mode</span>`

    if (theme == "dark"){
        theme = "light"

        document.body.style = `
        --bg-color:${lightVars.bgColor};
        --object-color:${lightVars.objectColor};
        --text-color:${lightVars.textColor};
        --border-color:${lightVars.borderColor};
        --shadow:${lightVars.shadow}`
    }else{
        theme = "dark"

        document.body.style = `
        --bg-color:${darkVars.bgColor};
        --object-color:${darkVars.objectColor};
        --text-color:${darkVars.textColor};
        --border-color:${darkVars.borderColor};
        --shadow:${darkVars.shadow}`
    }
}

showDates()
setInterval(showDates, 1000)

// click on the clock
clockBtn.addEventListener("click", function(e){
    if (mode == "timer"){
        clockBox.style.animation = "slide-from-left 0.2s ease-in-out"

        clockBtn.classList.add("button-focus")
        timerBtn.classList.remove("button-focus")

        mode = "clock"

        clockBox.classList.add("open")
        timerBox.classList.remove("open")
    }
})

// click on the timer
timerBtn.addEventListener("click", function(e){
    if (mode == "clock"){
        timerBtn.classList.add("button-focus")
        clockBtn.classList.remove("button-focus")

        mode = "timer"

        timerBox.classList.add("open")
        clockBox.classList.remove("open")
    }
})

// slide
// slide on the clock
document.body.addEventListener("touchstart", function(e){
    touchStart.x = e.targetTouches[0].clientX;
    touchStart.y = e.targetTouches[0].clientY;
    touchEnd.x = e.targetTouches[0].clientX;
    touchEnd.y = e.targetTouches[0].clientY;
})
document.body.addEventListener("touchmove", function(e) {
    touchEnd.x = e.targetTouches[0].clientX;
    touchEnd.y = e.targetTouches[0].clientY;
})
document.body.addEventListener("touchend", e => {
    // slide to the clock
    if (mode == "timer" && !isFullscreen && Math.abs(touchStart.x - touchEnd.x) > 100 && Math.abs(touchStart.y - touchEnd.y) < 100 && touchStart.x < touchEnd.x) {
        clockBox.style.animation = "slide-from-left 0.2s ease-in-out"

        clockBtn.classList.add("button-focus")
        timerBtn.classList.remove("button-focus")

        mode = "clock"

        clockBox.classList.add("open")
        timerBox.classList.remove("open")
    }else if (mode == "clock" && !isFullscreen && Math.abs(touchStart.x - touchEnd.x) > 100 && Math.abs(touchStart.y - touchEnd.y) < 100 && touchStart.x > touchEnd.x){
        timerBtn.classList.add("button-focus")
        clockBtn.classList.remove("button-focus")

        mode = "timer"

        timerBox.classList.add("open")
        clockBox.classList.remove("open")
    }
})

// play/stop button
startStopBtn.addEventListener("click", startStop)
// reset button
resetBtn.addEventListener("click", resetTimer)

// rotate buttons
clockRotateBtn.addEventListener("click", rotate)
timerRotateBtn.addEventListener("click", rotate)

// fullscreen buttons
clockFullscreenBtn.addEventListener("click", function(){ fullscreen(clockBox) })
timerFullscreenBtn.addEventListener("click", function(){ fullscreen(timerBox) })

// theme switcher
ThemeSwitcher.addEventListener("click", changeTheme)