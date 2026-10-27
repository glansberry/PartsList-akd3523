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

function alertCoord(e) {

	if (!window.opener) {	// If page has been opened in a separate window, it means that page is for print preview and should NOT zoom when clicked
		if( !e ) {
			if( window.event ) {
				//DOM
				e = window.event;
			} else {
				//TOTAL FAILURE, WE HAVE NO WAY OF REFERENCING THE EVENT
				return;
			}
		}

		if( typeof( e.pageX ) == 'number' ) {
			//NS 4, NS 6+, Mozilla 0.9+
			var xcoord = e.pageX;
			var ycoord = e.pageY;
		} else {
			if( typeof( e.clientX ) == 'number' ) {
				//IE, Opera, NS 6+, Mozilla 0.9+
				//except that NS 6+ and Mozilla 0.9+ did pageX ...
				var xcoord = e.clientX;
				var ycoord = e.clientY;
				if( !( ( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) || ( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) ||	window.navigator.vendor == 'KDE' ) ) {
					if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
						//IE 4, 5 & 6 (in non-standards compliant mode)
						xcoord += document.body.scrollLeft;
						ycoord += document.body.scrollTop;
					} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
						//IE 6 (in standards compliant mode)
						xcoord += document.documentElement.scrollLeft;
						ycoord += document.documentElement.scrollTop;
					}
				}
			} else {
				//TOTAL FAILURE, WE HAVE NO WAY OF OBTAINING THE
				//MOUSE COORDINATES
				return;
			}
		}

		var myWidth = 0, myHeight = 0;
		if( typeof( window.innerWidth ) == 'number' ) {
			myWidth = window.innerWidth;
			myHeight = window.innerHeight;
			_fork = 1;
		} else if( document.documentElement && ( document.documentElement.clientWidth ||document.documentElement.clientHeight ) ) {
			myWidth = document.documentElement.clientWidth;
			myHeight = document.documentElement.clientHeight;
			_fork = 2;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			myWidth = document.body.clientWidth;
			myHeight = document.body.clientHeight;
			_fork = 3;
		}
		var scrOfX = 0, scrOfY = 0;
		if( typeof( window.pageYOffset ) == 'number' ) {
			//Netscape compliant
			scrOfY = window.pageYOffset;
			scrOfX = window.pageXOffset;
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			//DOM compliant
			scrOfY = document.body.scrollTop;
			scrOfX = document.body.scrollLeft;
		} else if( document.documentElement &&
				( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			//IE6 standards compliant mode
			scrOfY = document.documentElement.scrollTop;
			scrOfX = document.documentElement.scrollLeft;
		}
		_old_width = string2num(document.images.illustration.style.width)
		_old_height = string2num(document.images.illustration.style.height)

		if (!e.ctrlKey) {
			if (e.shiftKey) {
	//			top._illustration_scalefactor = top._illustration_scalefactor/1.3
				_width = parseInt(_old_width/1.3)
				_height = parseInt(_old_height/1.3)
			} else {
	//			top._illustration_scalefactor = top._illustration_scalefactor*1.3
				_width = parseInt(_old_width*1.3)
				_height = parseInt(_old_height*1.3)
			}
			document.images.illustration.style.width = _width
			document.images.illustration.style.height = _height
		}

		//window.alert( 'Fork = ' + _fork + ' Width = ' + myWidth + ' and height = ' + myHeight + '\nX: ' + scrOfX + ' Y: ' + scrOfY +'\nMouse coordinates are ('+xcoord+','+ycoord+')\nShiftKey state: ' + e.shiftKey + '\nScale: ' + _illustration_scalefactor)
		//top.SetCookie("illustration_scalefactor",top._illustration_scalefactor)
		//document.location=document.location
		//oldstring=document.images.illustration.style.width
		//alert(document.images.illustration.style.width.replace(/px/g, ""))
		//alert(e.shiftKey + ', ' + _illustration_scalefactor + ', ' + (document.images.illustration.style.height.replace(/px/g, ""))*_illustration_scalefactor + ', ' + (document.images.illustration.style.width.replace(/px/g, ""))*_illustration_scalefactor)

		if (!e.ctrlKey) {
	//	alert(!e.ctrlKey)
			if (e.shiftKey) {
				parent.illustrations.scrollTo(xcoord/1.3 - parseInt(myWidth/2),ycoord/1.3 - parseInt(myHeight/2))
			} else {
				parent.illustrations.scrollTo(xcoord*1.3 - parseInt(myWidth/2),ycoord*1.3 - parseInt(myHeight/2))
			}
		} else {
				parent.illustrations.scrollTo(xcoord - parseInt(myWidth/2),ycoord - parseInt(myHeight/2))
		}
	}

}

function string2num(_string) {
//	alert("string: " + _string)
	_newstring = _string.replace(/px/g)
	_newvalue = parseInt((parseFloat(_newstring)))
//	alert("newvalue: " + _newvalue)
	return _newvalue
}
