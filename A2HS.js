var deferredPrompt;
var installAlertOpen = true;

const installBlock = document.getElementById("install-alert");
const installButton = document.getElementById("install-button");
const dismissButton = document.getElementById("dismiss-button");

window.addEventListener('beforeinstallprompt', (e) => {
    if(installAlertOpen == true){
        // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    installBlock.style.display = "flex";

    installButton.addEventListener('click', (e) => {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {

            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                installAlertOpen = false;
                installBlock.style.display = "none";
            } else {
                console.log('User dismissed the A2HS prompt');
                installAlertOpen = false;
                installBlock.style.display = "none";
            }
            deferredPrompt = null;
        })
    })
    }
})

dismissButton.addEventListener("click", function () {
    installBlock.style.display = "none";
    installAlertOpen = false;
})