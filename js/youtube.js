chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.image) {
			console.log("capture complete. this is content script. ready to post", request);
			var values = MouseSelection.getValues();
			console.log("selection", values);
			postData(request.image, values.top, values.left, values.width, values.height);
		}
	}
);




var texteditor = null;

/*
function createEditButton() {
	var ClipNote_texteditButton = jQuery("<div></div>");
	ClipNote_texteditButton.html("Edit");
	ClipNote_texteditButton.addClass("textedit-button");
	ClipNote_texteditButton.click(function() {
		MouseSelection.init(function(element) {
			console.log("selection done");	
			TextEditor.create(element);
		});	
	});
	$("#player").append(ClipNote_texteditButton);
}*/

function openSidebar() {
	var sidebar = $('<iframe></iframe>');
	sidebar.attr('id', 'chinti_edit');
	sidebar.addClass('sidebar');
	$('body').append(sidebar);
	sidebar.attr('src', 'http://localhost:9873/edit');
}

function enableSelection() {
	MouseSelection.init(function(element) {
		console.log("selection done");	
		createGrabButton(element);
		TextEditor.create(element);
	});	
}

function appendInput(name, value, fform) {
    var input = $('<input/>');
    input.attr('type', 'hidden');
    input.attr('name', name);
    input.val(value);
    fform.append(input);    
}

function postData(imgUrl, top, left, width, height) {
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
    appendInput('top', Math.ceil(top), fform);
    appendInput('left', Math.ceil(left), fform);
    appendInput('width', Math.ceil(width), fform);
    appendInput('height', Math.ceil(height), fform);
    $("#chinti_uploadform").submit();
}

function createGrabButton(dockElement) {
	var ClipNote_snapshotButton = jQuery("<div></div>");
	ClipNote_snapshotButton.html("GRAB ->");
	ClipNote_snapshotButton.addClass("snapshot-button");
	ClipNote_snapshotButton.click(function() {
		//var player = jQuery('#player-api');
		//var offset = player.offset();
		var values = MouseSelection.getValues();
		MouseSelection.hideBorder();
		chrome.runtime.sendMessage({
			event: "button-clicked"/*,
			top: values.top,
			left: values.left,
			width: values.width,
			height: values.height*/
		}, function(response) {}); 
	});
	//$("#player").append(ClipNote_snapshotButton);
	dockElement.append(ClipNote_snapshotButton);
}







