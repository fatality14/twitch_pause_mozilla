console.log("initial")

let injectScript = 
`
    let pbuttonLost = true;
    
    function tpLog(str){
        const logPrefix = '[TP] ';
        console.log(logPrefix + str);
    }

    function setPauseEvent(){
        let pbutton = document.querySelector('[data-a-target="player-play-pause-button"]');
        let pscreen = document.querySelector('.click-handler');

        if(!pscreen){
            pscreen = document.querySelector('.video-player__overlay')
        }

        if(pscreen){        
            if(!pbutton){
                pbuttonLost = true;
                tpLog("no pause button on the page")
            }
            else if(pbuttonLost){
                    let curr = pscreen.addEventListener('click', function(e){pbutton.click()});
                    tpLog("pause event set");
                    pbuttonLost = false;
            }
            else{
                tpLog("pause event is already set");
            }
        }
        else{
            tpLog("no media found on the page")
        }
    }

    tpLog("observe");
    setInterval(setPauseEvent, 1000);
`;

function inject(){
    let hook = document.createElement('script');
    hook.appendChild(document.createTextNode(injectScript));
    hook.className = "twitch-pause";
    console.log("hook");
    document.head.appendChild(hook);
}

if(localStorage.getItem("twitchPauseRefreshState") == 1){
    inject();
    localStorage.setItem("twitchPauseRefreshState", 0);
}

window.addEventListener("load", function(){
    inject();
    localStorage.setItem("twitchPauseRefreshState", 0);
})
window.addEventListener("unload", function(){
    localStorage.setItem("twitchPauseRefreshState", 1);
})