chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    file: 'js/start.js'
  }); 
});

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
                respond({
                    image: imgUrl
                });
            });    
        });
        //sendResponse({image: 'none' });
    }
});







