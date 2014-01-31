var existingComments = document.getElementById('fbComments');

var iframe = null;

if (!existingComments) {
    console.log("inserting comment block");
    var url = document.location.href;
    iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'tyckr-remote');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('style', 'border: none; width: 490px; height: 500px; overflow-x: hidden');
    iframe.src = 'http://localhost:9889/facebook/?url=' + encodeURIComponent(url);
    var bottom = document.getElementById('abArticleBottom');
    if (bottom) {
        bottom.appendChild(iframe);
    }
}
else {
    console.log("article already has comments");
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Lyssna efter att facebook-iframen har ändrat storlek (höjd) och ändra vår yttre iframe så att allt får plats.
eventer(messageEvent,function(e) {
    var data = e.data;
    if (data.indexOf('type=resize') !== -1 && data.indexOf('height=') !== -1) {
        var pp = data.split("height=")[1];
        var height = pp.split("&")[0];
        iframe.style.height = (height + 50) + "px";
    }
},false);