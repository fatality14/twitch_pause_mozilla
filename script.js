console.log("[TP] initial")

let injectScript = 
`
    let debug = false;
    
    let pageRef = undefined;
    let pevent = undefined;
    let pbutton = undefined;;
    let pscreen = undefined;
    
    const logPrefix = '[TP] ';
    function tpLog(str){
        if(debug){
            console.log(logPrefix + str);
        }
    }

    function setPauseEvent(){
        try{
            pscreen.removeEventListener('click', pevent);
            tpLog("pause event removed")
        }
        catch{
            tpLog("tried to remove event, but there were no event set");
        }

        pbutton = document.querySelector('[data-a-target="player-play-pause-button"]');
        pscreen = document.querySelector('.click-handler');
        if(!pscreen){
            pscreen = document.querySelector('.video-player__overlay')
        }

        if(pscreen){
            if(!pbutton){
                tpLog("no pause button on the page")
            }
            else{
                pevent = function(e){
                    tpLog("pause")
                    pbutton.click();
                };
                
                pscreen.addEventListener('click', pevent);
                tpLog("pause event set");
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
    if (!document.querySelector(".twitch-pause")){
        let hook = document.createElement('script');
        hook.appendChild(document.createTextNode(injectScript));
        hook.className = "twitch-pause";
        console.log("[TP] hook");
        document.head.appendChild(hook);
    }
}

setInterval(inject, 1000);