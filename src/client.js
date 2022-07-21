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

loadScript("https://unpkg.com/peerjs@1.4.5/dist/peerjs.min.js").then(result =>{

    let p = new Peer();
    let id = prompt("Id:");
    p.on("error",e => console.log(e));
    console.log(id);
    p.on('open',e =>{
        let con = p.connect(id);

        con.on('open',e2 =>{
            window.addEventListener("keydown",e =>{
                con.send({type:"keydown",options:{
                        key:e.key,
                        keyCode:e.keyCode,
                        code:e.code,
                        which:e.which,
                        shiftKey:e.shiftKey,
                        ctrlKey:e.ctrlKey,
                        metaKey:e.metaKey
                    }});
            });
            window.addEventListener("keyup",e =>{
                con.send({type:"keyup",options:{
                        key:e.key,
                        keyCode:e.keyCode,
                        code:e.code,
                        which:e.which,
                        shiftKey:e.shiftKey,
                        ctrlKey:e.ctrlKey,
                        metaKey:e.metaKey
                    }});
            });
        });
    });

    p.on("call", call =>{
        call.answer();

        call.on('stream', stream => {
            document.getElementById("stream").srcObject = stream;
        });
    });

}, error =>{
    alert(error + ". Terminating");
});
