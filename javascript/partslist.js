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
	var scale = illustrationScale();
	var _old_width = declaredSize(my_image, "width");
	var _old_height = declaredSize(my_image, "height");
	if (_old_width) my_image.style.width = Math.round(_old_width * scale) + "px";
	if (_old_height) my_image.style.height = Math.round(_old_height * scale) + "px";
}

function illustrationScale() {
	try {
		if (window.opener && window.opener._illustration_height) {
			return window.opener._illustration_height / 1033;
		}
		if (typeof top._illustration_scale !== "undefined") {
			var scale = parseFloat(top._illustration_scale);
			if (scale) return scale;
		}
	} catch (e) {}
	return 1;
}

function declaredSize(img, axis) {
	var fromStyle = string2num(img.style[axis]);
	if (fromStyle) return fromStyle;
	var attr = img.getAttribute("style") || "";
	var match = attr.match(new RegExp(axis + "\\s*:\\s*([\\d.]+)", "i"));
	if (match) return parseFloat(match[1]);
	return axis === "width" ? img.naturalWidth : img.naturalHeight;
}

function string2num(_string) {
	if (_string == null) return NaN;
	var match = String(_string).match(/[\d.]+/);
	return match ? parseFloat(match[0]) : NaN;
}

function load_illustration(_illustration_file){

	if (!window.opener) {
		try {
			parent.illustrations.location=_illustration_file
		} catch (e) {
			var a = document.createElement("a");
			a.href = _illustration_file;
			a.target = "illustrations";
			(document.body || document.documentElement).appendChild(a);
			a.click();
		}
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
