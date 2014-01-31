var TextEditor = {
	create: function() {
		this.element = jQuery("<div></div>");
		this.element.addClass('caption');
		this.element.attr('contenteditable', 'true');
		this.element.html('Enter your caption');
		this.element.on('click', function() {
			TextEditor.kkk = TextEditor.element.on('keypress keydown keyup', function(ev) {
				ev.stopPropagation();
			});
		});
		this.element.on('blur', function() {	
			TextEditor.element.off('keypress keydown keyup');
		});
		jQuery('#player').append(this.element);
	}
};