
/*
    Loads script from src into page. Will return promise that
    waits for script to load.
 */
function loadScript(url){
    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);

    return new Promise((resolve,reject) =>{
        script.addEventListener("load",() =>{
            resolve("File loaded");
        });
        script.addEventListener("error",e => {
            reject(e);
        });
    });
}

/*
    Creates a peer that is waiting for a connection.Once
    connected to will execute all key presses the other peer sends.
    Will stream selected canvas to other peer.
 */
function createPeer(canvas){
    let p = new Peer();

    //Destroys connection when window closes
    window.addEventListener("beforeunload",e =>{
       p.destroy();
    });

    p.on("open",id =>{
        alert("Send this id to your friend:" + id);
    });

    //Receives keys pressed by other peer and streams canvas
    p.on("connection",conn =>{
        //Other peer sends over json with type of keyboard event(data.type) and options(data.options)
        conn.on('data',data =>{
            window.dispatchEvent(new KeyboardEvent(data.type,data.options));
        });

        //Prompts user for how many frames to stream the canvas
        let frames = +prompt("Max Frame cap for stream(negative number for no stream)");
        if(frames !== NaN && frames > 0) {
            p.call(conn.peer,canvas.captureStream(frames));
        }
    });

    p.on("disconnected", e=>{
       p.reconnect();
    });

    p.on("close", e=>{
        p.destroy();
    });

    p.on("error", e=>{
        alert("Error:" + e.type + ". Please reload the page an try again");
    });
}

/*
    Configures everything to be able to stream canvas.If iframe is selected opens in new tab(need to rerun bookmarklet).
    Else will try to establish connection with other peer and stream canvas.
 */
function streamCanvas(canvas){
    loadScript("https://unpkg.com/peerjs@1.4.5/dist/peerjs.min.js").then(result =>{
        alert("Streaming canvas:" + canvas.id)
        createPeer(canvas);
    }, error =>{
        alert(error + ". Terminating");
    });
}

//If user focused on a iframe or canvas then preform actions
if(document.activeElement.tagName === "CANVAS"){
    streamCanvas(document.activeElement);
}
else if(document.activeElement.tagName === "IFRAME"){
    alert("Please enable popups");
    window.open(document.activeElement.src);
}
else{
    //Prompts user to select iframe or canvas if not focused
    let canvases = document.getElementsByTagName("canvas");
    let iframes = document.getElementsByTagName("iframe");
    if(canvases.length > 0){
        let response = "Input number for canvas you want to stream(-1 if you want to open iframe):";
        for(let i = 0;i < canvases.length;i++){
            response += (i + "." + canvases[i].id);
        }

        let i = +prompt(response);

        if( i === NaN || i < -1 || i >= canvases.length){
            alert("Improper input. Terminating");
        }
        else {
            streamCanvas(canvases[i]);
        }
    }
    else if(iframes.length > 0){
        let response = "Input number for iframe you want to open in new window:";
        for(let i = 0;i < iframes.length;i++){
            response += (i + "." + iframes[i].id);
        }

        let i = +prompt(response);

        if( i === NaN || i < 0 || i >= canvases.length){
            alert("Improper input. Terminating");
        }
        else{
            window.open(iframes[i].src);
        }
    }
    else{
        alert("Sorry cant play the game multiplayer");
    }
}








