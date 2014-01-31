var TextEditor = {
	create: function(container) {
		this.$container = $(container);
		this.element = jQuery("<div></div>");
		this.element.addClass('caption');

		this.width = Math.ceil(this.$container.width() * 0.66);
		this.height = Math.ceil(this.$container.height() * 0.2);

		this.element.css({
			'width': this.width + 'px',
			'height': this.height + 'px',
			'left': (this.$container.width()/2) - this.width/2 + 'px',
			'bottom': '0px'
		});

		this.element.attr('contenteditable', 'true');
		this.element.attr('spellcheck', 'false');
		this.element.html('Enter your caption');
		this.element.on('click', function() {
			TextEditor.focus();
		});
		this.element.on('blur', function() {	
			TextEditor.element.off('keypress keydown keyup');
		});

		jQuery(container).append(this.element);		

		TextEditor.focus();
	},

	focus: function() {
		$(this.element).focus();
		TextEditor.selectAll();
		TextEditor.kkk = TextEditor.element.on('keypress keydown keyup', function(ev) {
			ev.stopPropagation();
		});		
	},

	selectAll: function() {
		var range = document.createRange();
		range.selectNodeContents(TextEditor.element[0]);
		var sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);		
	}
};