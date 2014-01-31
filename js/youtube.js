chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.image) {
			console.log("image url in the content script", request.image);
			var img = jQuery("<img/>").attr('src', request.image);
			jQuery("body").append(img);			
		}
	}
);




var texteditor = null;

function createEditButton() {
	var ClipNote_texteditButton = jQuery("<div></div>");
	ClipNote_texteditButton.html("Edit");
	ClipNote_texteditButton.addClass("textedit-button");
	ClipNote_texteditButton.click(function() {
		/*if (!texteditor) {
			texteditor = TextEditor.create();			
		}*/
		MouseSelection.init(function(element) {
			console.log("selection done");	
			TextEditor.create(element);
		});	
	});
	$("#player").append(ClipNote_texteditButton);
}

function createGrabButton() {
	var ClipNote_snapshotButton = jQuery("<div></div>");
	ClipNote_snapshotButton.html("Grab");
	ClipNote_snapshotButton.addClass("snapshot-button");
	ClipNote_snapshotButton.click(function() {
		var player = jQuery('#player-api');
		var offset = player.offset();
		chrome.runtime.sendMessage({
			event: "button-clicked",
			top: offset.top,
			left: offset.left,
			width: player.width(),
			height: player.height()
		}, function(response) {});
	});
	$("#player").append(ClipNote_snapshotButton);
}

jQuery(function() {
	createEditButton();
	createGrabButton();
});



