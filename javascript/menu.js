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

function clear_search_text(){

	var _element = null;
	try {
		_element = top.getDivRef('searchtext','controls');
	} catch (e) {}

	if (_element && _element.innerHTML && _element.style) {
		if (_element.innerHTML == "EXIT SEARCH") {
			_element.innerHTML = "SEARCH";
			_element.style.color = "black";
		}
	}

}

function getCurrentSetting(){
if (document.body)
alert((document.body.cols)? document.body.cols : document.body.rows)
return (document.body.cols)? document.body.cols : document.body.rows
}

function setframevalue(coltype, settingvalue){
if (coltype=="rows")
document.body.rows=settingvalue
else if (coltype=="cols")
document.body.cols=settingvalue
}

function resizeFrame(contractsetting){
if (getCurrentSetting()!=defaultsetting)
setframevalue(columntype, defaultsetting)
else
setframevalue(columntype, contractsetting)
}

function init(){
if (!document.all && !document.getElementById) return
if (document.body!=null){
columntype=(document.body.cols)? "cols" : "rows"
defaultsetting=(document.body.cols)? document.body.cols : document.body.rows
}
else
setTimeout("init()",100)
}
