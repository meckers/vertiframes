function respond(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
        console.log(response.farewell);
    });
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("event", request);
    if (request.event == "button-clicked") {
        chrome.windows.getCurrent(function (win) {    
            chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {
                console.log("sending response", imgUrl);



                jQuery.post("http://localhost:9873/upload", {
                    image: imgUrl,
                    top: Math.ceil(request.top),
                    left: Math.ceil(request.left),                    
                    width: Math.ceil(request.width),
                    height: Math.ceil(request.height)
                    /*
                    offset: { left: 50, top: 70 },
                    dimensions: { width: 100, height: 120 }
                    */
                }, function(data) {
                    console.log("Upload done...", data);                    
                    chrome.tabs.create({ url: 'http://localhost:9873' + data.url });
                });

                respond({image: imgUrl});
            });    
        });
        //sendResponse({image: 'none' });
    }
});







