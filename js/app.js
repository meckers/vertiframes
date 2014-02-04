var ClipNote = ClipNote || {};

ClipNote.App = {
	
	frame: null,
	sidebar: null,
	baseUrl: 'http://localhost:9873',

	init: function() {
		this.frame = ClipNote.Frame;
		this.registerListeners();			
	},

	activate: function() {
		this.openSidebar();
		this.frame.init();
	},

	registerListeners: function() {
		//chrome.runtime.onMessage.addListener(this.onMessage);
		var me = this;
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			me.onMessage(request, sender, sendResponse);
		});
	},

	// Called whenever the extension script sends a message to (this) content script.
	onMessage: function(request, sender, sendResponse) {
		if (request.image) {
			console.log("capture complete. this is content script. ready to post", request);
			var values = this.frame.getValues();
			console.log("selection", values);
			this.postData(request.image, request.imageNaked, values.top, values.left, values.width, values.height);
		}
	},

	openSidebar: function() {
		this.sidebar = $('<iframe></iframe>');
		this.sidebar.attr('id', 'chinti_edit');
		this.sidebar.addClass('sidebar');
		$('body').append(this.sidebar);
		this.sidebar.attr('src', this.baseUrl + '/edit');
	},

	// Since I want to specify target, It seems I need to do this via an injected form:
	postData: function(imgUrl, imageNakedUrl, top, left, width, height) {
		var fform = $('<form></form>');
		fform.attr({
			'id': 'chinti_uploadform',
			'method': 'POST',
			'target': 'chinti_edit',
			'enctype': 'multipart/form-data',
			'action': this.baseUrl + '/upload'
		});
		$('body').append(fform);
		this.appendInput('image', imgUrl, fform);
		//this.appendInput('imageNaked', imgNakedUrl, fform);
		this.appendInput('top', Math.ceil(top), fform);
		this.appendInput('left', Math.ceil(left), fform);
		this.appendInput('width', Math.ceil(width), fform);
		this.appendInput('height', Math.ceil(height), fform);
		$("#chinti_uploadform").submit();
	},

	appendInput: function(name, value, fform) {
	    var input = $('<input/>');
	    input.attr('type', 'hidden');
	    input.attr('name', name);
	    input.val(value);
	    fform.append(input);    
	}	
}