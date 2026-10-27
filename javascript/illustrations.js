/* Lets frame pages reach each other when each file is its own origin (opening index.html from disk). */
(function () {
	function reachable(win) {
		try {
			return !!(win && win.document && win.document.nodeType === 9);
		} catch (err) {
			return false;
		}
	}

	if (reachable(window.parent)) {
		return;
	}

	var shim = {
		_illustration_scale: 1,
		_illustration_scalefactor: 1,
		_illustration_height: 1033,
		_linespacing: 120
	};

	function frameSlot(name) {
		var slot = {
			scrollTo: function (x, y) { window.scrollTo(x, y); },
			focus: function () {},
			document: {}
		};
		Object.defineProperty(slot, "location", {
			configurable: true,
			get: function () { return "about:blank"; },
			set: function (url) {
				function go() {
					var a = document.createElement("a");
					a.href = url;
					a.target = name;
					a.style.display = "none";
					(document.body || document.documentElement).appendChild(a);
					a.click();
				}
				if (document.readyState === "complete") go();
				else window.addEventListener("load", go);
			}
		});
		return slot;
	}

	var names = ["partslist", "illustrations", "menuloc", "controls", "print_frame"];
	for (var i = 0; i < names.length; i++) {
		shim[names[i]] = frameSlot(names[i]);
	}
	shim.frames = {};
	shim.getDivRef = function () { return null; };

	var fns = ["resizeMainFrame", "resizePartsFrame", "resizeIllusFrame", "resizePrintFrame", "reset_illustration", "search_text", "load_config", "load_help", "print_frames"];
	for (var j = 0; j < fns.length; j++) {
		shim[fns[j]] = function () {};
	}

	try {
		Object.defineProperty(window, "parent", { configurable: true, get: function () { return shim; } });
	} catch (err) {}
	try {
		Object.defineProperty(window, "top", { configurable: true, get: function () { return shim; } });
	} catch (err) {}
})();

function image_resize(my_image) {
	var scale = 1;
	try {
		if (window.opener && window.opener._illustration_height) {
			scale = window.opener._illustration_height / 1033;
		} else if (typeof top._illustration_scale !== "undefined") {
			var parsed = parseFloat(top._illustration_scale);
			if (parsed) scale = parsed;
		}
	} catch (e) {}
	var _old_width = declaredSize(my_image, "width");
	var _old_height = declaredSize(my_image, "height");
	if (_old_width) my_image.style.width = Math.round(_old_width * scale) + "px";
	if (_old_height) my_image.style.height = Math.round(_old_height * scale) + "px";
}

function declaredSize(img, axis) {
	var fromStyle = string2num(img.style[axis]);
	if (fromStyle) return fromStyle;
	var attr = img.getAttribute("style") || "";
	var match = attr.match(new RegExp(axis + "\\s*:\\s*([\\d.]+)", "i"));
	if (match) return parseFloat(match[1]);
	return axis === "width" ? img.naturalWidth : img.naturalHeight;
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
		if (!document.images.illustration) return;
		_old_width = string2num(document.images.illustration.style.width)
		_old_height = string2num(document.images.illustration.style.height)
		if (!_old_width || !_old_height) return;

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
			document.images.illustration.style.width = _width + "px"
			document.images.illustration.style.height = _height + "px"
		}

		//window.alert( 'Fork = ' + _fork + ' Width = ' + myWidth + ' and height = ' + myHeight + '\nX: ' + scrOfX + ' Y: ' + scrOfY +'\nMouse coordinates are ('+xcoord+','+ycoord+')\nShiftKey state: ' + e.shiftKey + '\nScale: ' + _illustration_scalefactor)
		//top.SetCookie("illustration_scalefactor",top._illustration_scalefactor)
		//document.location=document.location
		//oldstring=document.images.illustration.style.width
		//alert(document.images.illustration.style.width.replace(/px/g, ""))
		//alert(e.shiftKey + ', ' + _illustration_scalefactor + ', ' + (document.images.illustration.style.height.replace(/px/g, ""))*_illustration_scalefactor + ', ' + (document.images.illustration.style.width.replace(/px/g, ""))*_illustration_scalefactor)

		var scrollX, scrollY;
		if (!e.ctrlKey) {
	//	alert(!e.ctrlKey)
			if (e.shiftKey) {
				scrollX = xcoord/1.3 - parseInt(myWidth/2);
				scrollY = ycoord/1.3 - parseInt(myHeight/2);
			} else {
				scrollX = xcoord*1.3 - parseInt(myWidth/2);
				scrollY = ycoord*1.3 - parseInt(myHeight/2);
			}
		} else {
				scrollX = xcoord - parseInt(myWidth/2);
				scrollY = ycoord - parseInt(myHeight/2);
		}
		try {
			parent.illustrations.scrollTo(scrollX, scrollY);
		} catch (err) {
			window.scrollTo(scrollX, scrollY);
		}
	}

}

function string2num(_string) {
	if (_string == null) return NaN;
	var match = String(_string).match(/[\d.]+/);
	return match ? parseFloat(match[0]) : NaN;
}
