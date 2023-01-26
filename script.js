console.log("initial")

let pbuttonLost = true;

function setPauseEvent(){
    let pbutton = document.querySelector('[data-a-target="player-play-pause-button"]');
    let pscreen = document.querySelector('.click-handler');
    
    if(!pbutton){
        pbuttonLost = true;
        console.log("no pause button on the page")
    }
    else if(pbuttonLost){
            let curr = pscreen.addEventListener('click', function(e){pbutton.click()});
            console.log("pause event set");
            pbuttonLost = false;
    }
    else{
        console.log("pause event is already set");
    }
}

let oldHref = document.location.href;
const body = document.querySelector("body");
const observer = new MutationObserver(mutations => {
    if(oldHref != document.location.href){
        oldHref = document.location.href;
        setPauseEvent();
    }
})

observer.observe(body, { childList: true, subtree: true });


if(localStorage.getItem("twitchPauseRefreshState") == 1){
    setPauseEvent();
    localStorage.setItem("twitchPauseRefreshState", 0);
}

window.addEventListener("load", function(){
    setPauseEvent();
    localStorage.setItem("twitchPauseRefreshState", 0);
})
window.addEventListener("unload", function(){
    localStorage.setItem("twitchPauseRefreshState", 1);
})