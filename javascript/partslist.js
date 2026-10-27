function image_resize(my_image) {
	_old_width = string2num(my_image.style.width)
	_old_height = string2num(my_image.style.height)
	if (!window.opener) {
		my_image.style.width = parseInt(_old_width*top._illustration_scale);
		my_image.style.height = parseInt(_old_height*top._illustration_scale);
	} else {
		_scale = (window.opener._illustration_height/1033)
		my_image.style.width = parseInt(_old_width*_scale);
		my_image.style.height = parseInt(_old_height*_scale);
	}
}

function string2num(_string) {
	_newstring = _string.replace(/px/g)
	_newvalue = parseInt((parseFloat(_newstring)))
	return _newvalue
}

function load_illustration(_illustration_file){

	if (!window.opener) {
		parent.illustrations.location=_illustration_file
	}

}

function getDivRef(_id) {

	if( document.getElementById ) { return document.getElementById(_id); }
	if( document.all ) { return document.all[_id]; }
	if( document.layers ) { return document.layers[_id]; }
	return false;
}

function set_lineHeight() {

	if(window.opener&&typeof(opener._linespacing)!='undefined') {
//		var _element_1 = getDivRef('thead_id');
		var _element_2 = getDivRef('tbody_id');

//		if (_element_1.style) {
//			_element_1 = _element_1.style;
//		}
		if (_element_2.style) {
			_element_2 = _element_2.style;
		}

//			_element_1.lineHeight = opener._linespacing + '%';
			_element_2.lineHeight = opener._linespacing + '%';
			self.focus();
	}
}

function set_lineHeightBody() {

	if(window.opener&&typeof(opener._linespacing)!='undefined') {
		var _element_1 = getDivRef('body_id');

		if (_element_1.style) {
			_element_1 = _element_1.style;
		}

			_element_1.lineHeight = opener._linespacing + '%';
			self.focus();
	}
}
