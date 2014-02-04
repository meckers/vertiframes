var ClipNote = ClipNote || {};

ClipNote.Frame = {

	element: null,
	image: null,
	imageWithCaption: null,
	text: null,
	textEditor: null,
	mouseSelection: null,

	init: function() {
		//this.element = element;
		this.textEditor = ClipNote.TextEditor;
		this.mouseSelection = ClipNote.MouseSelection;
		this.enableSelection();
		console.log("Frame initialized");
	},

	enableSelection: function() {
		var me = this;
		this.mouseSelection.init(function(element) {
			console.log("selection done");	
			me.onSelectionComplete(element);
		});	
	},

	onSelectionComplete: function(element) {
		this.element = element;
		this.textEditor.create(element);
		this.createGrabButton();
	},

	createGrabButton: function() {
		var me = this;
		var ClipNote_snapshotButton = jQuery("<div></div>");
		ClipNote_snapshotButton.html("GRAB ->");
		ClipNote_snapshotButton.addClass("snapshot-button");
		ClipNote_snapshotButton.click(function() {
			me.grabFrame();
		});
		this.element.append(ClipNote_snapshotButton);
	},

	grabFrame: function() {
		var values = this.mouseSelection.getValues();
		this.mouseSelection.hideBorder();
		chrome.runtime.sendMessage({
			event: "button-clicked"
		}, function(response) {}); 	
	},


	getValues: function() {
		return this.mouseSelection.getValues();
	}

};