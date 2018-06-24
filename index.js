navigator.mediaDevices.getUserMedia({ "audio": false, "video": true }).then(function(stream) {

    console.log("Yes");
    var Peer = require('simple-peer');
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    });

    peer.on('signal', function(data){
        document.getElementById('yourId').value = JSON.stringify(data);
    });

    document.getElementById('connect').addEventListener('click', function(){
        var otherId = JSON.parse(document.getElementById('otherId').value);
        peer.signal(otherId);
        console.log("Connected!");
    });

    document.getElementById('send').addEventListener('click', function(){
        var yourMessage = document.getElementById('yourMessage').value;
        peer.send(yourMessage);
        console.log("Sent!" + yourMessage);
    });

    peer.on('data', function(data){
        document.getElementById('messages').innerText += data + '\n';
    });

    peer.on('stream', function(stream){
        var video = document.createElement('video');
        document.body.appendChild(video);

        video.srcObject = stream;
        video.play();
    });

}).catch(function(err){
    console.log("No!");
    console.error(err);
});