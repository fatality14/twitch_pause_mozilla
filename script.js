let pbuttonLost = true;

function setPauseEvent(){
    let pbutton = document.querySelector('[data-a-target="player-play-pause-button"]');
    let pscreen = document.querySelector('.click-handler');
    
    if(!pbutton){
        pbuttonLost = true;
        console.log("no pause button on the page")
    }
    else{
        if(pbuttonLost){
            let curr = pscreen.addEventListener('click', function(e){pbutton.click()});
            console.log("pause event set");
            pbuttonLost = false;
        }
    }
}


const observeUrlChange = () => {
    setPauseEvent();    

    let refList = []
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver(mutations => {
        if(oldHref != document.location.href){
            refList.push(oldHref)
            oldHref = document.location.href;

            if(!refList.includes(oldHref)){
                setPauseEvent();
            }
        }
    });

    observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;
