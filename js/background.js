chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    //code: 'document.body.style.backgroundColor="red"'
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

/*
function appendInput(name, value, fform) {
    var input = $('<input/>');
    input.attr('type', 'hidden');
    input.attr('name', name);
    input.val(value);
    fform.append(input);    
}*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("event", request);
    if (request.event == "button-clicked") {
        chrome.windows.getCurrent(function (win) {    
            chrome.tabs.captureVisibleTab(win.id,{"format":"png"}, function(imgUrl) {

                //console.log('uploading');
/*
                var fform = $('<form></form>');
                fform.attr({
                    'id': 'chinti_uploadform',
                    'method': 'POST',
                    'target': 'chinti_edit',
                    'enctype': 'multipart/form-data',
                    'action': 'http://localhost:9873/upload'
                });
                $('body').append(fform);
                appendInput('image', imgUrl, fform);
                appendInput('top', Math.ceil(request.top), fform);
                appendInput('left', Math.ceil(request.left), fform);
                appendInput('width', Math.ceil(request.width), fform);
                appendInput('height', Math.ceil(request.height), fform);
                $("#chinti_uploadform").submit();
*/
/*
                jQuery.post("http://localhost:9873/upload", {
                    image: imgUrl,
                    top: Math.ceil(request.top),
                    left: Math.ceil(request.left),                    
                    width: Math.ceil(request.width),
                    height: Math.ceil(request.height)
                }, function(data) {
                    console.log("Upload done...", data);                    
                    chrome.tabs.create({ url: 'http://localhost:9873' + data.url });
                });
*/
                respond({
                    image: imgUrl/*,
                    top: request.top,
                    left: request.left,
                    width: request.width,
                    height: request.height*/
                });
            });    
        });
        //sendResponse({image: 'none' });
    }
});







