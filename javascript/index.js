var _menu_location;
var _cookie_length = 365
var _parameters = new Array();
_parameters = GetCookie("akd_partslist");

if(_parameters != null) {
	_parameters = _parameters.split("|");

	_frame_menu_width			= _parameters[0];
	_frame_print_height		= _parameters[1];
	_frame_display_heights	= _parameters[2];
	_save_config_on_exit		= _parameters[3];
	_save_config_nag			= _parameters[4];
	_illustration_scale		= _parameters[5];
} else {
	default_values();
}

var _parameters_print = new Array();
_parameters_print = GetCookie("akd_partslist_print");

if(_parameters_print != null) {
	_parameters_print = _parameters_print.split("|");

	_linespacing				= _parameters_print[0];
	_illustration_height		= _parameters_print[1];
	_print_preview_width		= _parameters_print[2];
	_print_preview_height	= _parameters_print[3];
} else {
	_linespacing				= 120;
	_illustration_height		= 850;
	_print_preview_width		= 600;
	_print_preview_height	= 400;
}

<!-- FRAME FUNCTIONS -------------------------------------------------------------------------- -->

function onloadEventHandler(){
	alert("Master Frameset: onload event fired");
}                                      // function init

//** Frameset handlers **
function setFramesetCols(IdOfFrameset, framesetCols){
alert("setFramesetCols");
   var frameset = document.getElementById(IdOfFrameset);
   if (frameset){                       // Can we find the frameset??
	  // Yes, set the new columns
   alert(framesetCols)
         frameset.cols = framesetCols;
      return true;
   }else{
      // No, return null to signal a failure
      return false;
   }
}                                      // function setFramesetCols

function collapseFrame(){
alert("collapseFrame");
	setFramesetCols("menuframe", "20,*");
}

<!-- GENERAL FUNCTIONS -------------------------------------------------------------------------- -->

function writestatus(_textstring) {
top.status=_textstring
}

function CreateWindow(_document) {
	_height = 250 * _multiplier
	_width = 350 * _multiplier
	NewWindow = window.open(_document, "TheWindow", "toolbar=yes,width=" + _width + ",height=" + _height + ",directories=no,status=yes,scrollbars=yes,resize=yes,menubar=no")
	if (NewWindow != null) {
		if (NewWindow.opener == null) NewWindow.opener = self;
	}

	if (_version == "N3") NewWindow.focus();

}

<!-- COOKIE FUNCTIONS -------------------------------------------------------------------------- -->

function getCookieVal (offset) {
<!-- See real Value of Cookie -->
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
//-- Get Value of Cookie
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
	var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
		return getCookieVal (j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}

function SetCookie (name, value, expires) {
// set time, it's in milliseconds
	var today = new Date();
	today.setTime(today.getTime());

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
// Set expiry for 365 days:
//	Number of Milliseconds is: 1000 * 60 * 60 * 24 * 365;

<!-- Set Value of Cookie -->
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? new Date(today.getTime()+(argv[2]*1000*60*60*24)) : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;

	document.cookie = name + "=" + escape (value) +
		((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
}

<!-- PAGE DRAWING FUNCTIONS -------------------------------------------------------------------------- -->

function reset_illustration() {
	top._illustration_scalefactor=1;
	top.partslist.location=top.partslist.location;
}

function getDivRef(_id,_frame) {
	if (_frame == 0) {
		if(document.getElementById ) {
			return document.getElementById(_id);
		}
		if(document.all ) {
			return document.all[_id];
		}
	//	if( document.getElementById ) { alert('getElementById');return document.getElementById(_id);}
	//	if( document.all ) { alert('documentall');return document.all[_id];}
		if( document.layers ) {
			return document.layers[_id];
		}
	} else {
		if(document.getElementById ) {
			return top.frames[_frame].document.getElementById(_id);
		}
		if(document.all ) {
			return top.frames[_frame].document.all[_id];
		}
		if( document.layers ) {
			return top.frames[_frame].document.layers[_id];
		}
	}
	return false;
}

function listElementHandlers(aObj)
   {
     if(!aObj)
	  	alert("null")
       return null;
     for(var list in aObj)
       if(list.match(/^on/))
         alert(list+'\n');
   }

function resizeMainFrame() {

	var _element = getDivRef('main',0);
	var _element1 = getDivRef('menutext','controls')

	if (_element.cols) {
		switch (_element.cols) {
			case top._frame_menu_open:
				_element.cols = top._frame_menu_closed;
				_element1.style.color = "red";
				break;
			case _frame_menu_closed:
				_element.cols = top._frame_menu_open;
				_element1.style.color = "black";
				break;
			default:
		}
	} else {
		alert('No go')
	}
}

function setMainFrame(_new_width) {
	var _element = getDivRef('main',0);
	if (_element.cols) {
		top._frame_menu_width = (parseInt(_new_width)) + "%";
		top._frame_menu_open		= top._frame_menu_width + "," + (100-parseInt(top._frame_menu_width)) + "%";
		_element.cols = top._frame_menu_open;
	}

	var _element1 = getDivRef('menutext','controls')
	if (_element1.innerHTML) {
				_element1.style.color = "black";
	} else {
		alert('No go')
	}


}

function setPrintFrame(_new_height) {
	var _element = getDivRef('menu',0);

	if (_element.rows) {
		top._frame_print_height = (parseInt(_new_height)) + "%";
		top._frame_print_open		= (100-parseInt(top._frame_print_height)) + "%," + top._frame_print_height ;
		_element.rows = top._frame_print_open;
	}

	setMainFrame(top.partslist.document.config_form.menu_frame_width.value);	// Set menu frame width to current width; this way, menu and print frame will show
	var _element1 = getDivRef('menutext','controls')
	if (_element1.innerHTML) {
				_element1.style.color = "black";
	} else {
		alert('No go')
	}

	var _element2 = getDivRef('printtext','controls')
	if (_element2.innerHTML) {
				_element2.innerHTML = "&nbsp;HIDE PRINT";
				_element2.style.color = "red";
	} else {
		alert('No go')
	}

}

function resizePrintFrame() {

	var _element = getDivRef('menu',0);
	var _element1 = getDivRef('printtext','controls')

	if (_element.rows) {
		switch (_element.rows) {
			case top._frame_print_closed:
				_element.rows = top._frame_print_open;
				_element1.innerHTML = "&nbsp;HIDE PRINT";
				_element1.style.color = "red";
				break;
			case _frame_print_open:
				_element.rows = top._frame_print_closed;
				_element1.innerHTML = "PRINT";
				_element1.style.color = "black";
				break;
			default:
		}
	} else {
		alert('No go')
	}

	var _element2 = getDivRef('main',0);
	var _element3 = getDivRef('menutext','controls')

	if (_element2.cols) {
		switch (_element2.cols) {
			case _frame_menu_closed:
				_element2.cols = top._frame_menu_open;
				_element3.style.color = "black";
				break;
			default:
		}
	} else {
		alert('No go')
	}

}

function resizePartsFrame() {

	var _element = getDivRef('display',0);
	var _element1 = getDivRef('partstext','controls')
	var _element2 = getDivRef('illustext','controls')

	if (_element.rows) {
		switch (_element1.style.color) {
			case "red":
				_element.rows = "48.5%,48.5%,3%";
				_element1.style.color = "black";
				break;
			default:
				_element.rows = "91%,6%,3%";
				_element1.style.color = "red";
		}
		_element2.style.color = "black";
	} else {
		alert('No go')
	}
}

function resizeIllusFrame() {

	var _element = getDivRef('display',0);
	var _element1 = getDivRef('partstext','controls')
	var _element2 = getDivRef('illustext','controls')

	if (_element.rows) {
		switch (_element2.style.color) {
			case "red":
				_element.rows = "48.5%,48.5%,3%";
				_element2.style.color = "black";
				break;
			default:
				_element.rows = "6%,91%,3%";
				_element2.style.color = "red";
		}
		_element1.style.color = "black";
	} else {
		alert('No go')
	}
}

function load_config() {
	var location;
	location = top.menuloc.location;
	location += '';	//Converts top.menuloc.location to a string

	if (location.indexOf("akd3524") == -1) {
		top.menuloc.location = "../menus/akd3523_h_2_menu.html";
	} else {
		top.menuloc.location = "../menus/akd3524_h_2_menu.html";
	}

	var _element = getDivRef('searchtext','controls');
	var menulocation;

	if (_element.innerHTML && _element.style) {
		if (_element.innerHTML == "EXIT SEARCH") {
			_element.innerHTML = "SEARCH";
			_element.style.color = "black";
		}
	} else {
		alert('No go!')
	}

}

function load_help() {
	var location;
	location = top.menuloc.location;
	location += '';	//Converts top.menuloc.location to a string

	if (location.indexOf("akd3524") == -1) {
		top.menuloc.location = "../menus/akd3523_h_1_menu.html";
	} else {
		top.menuloc.location = "../menus/akd3524_h_1_menu.html";
	}

	var _element = getDivRef('searchtext','controls');
	var menulocation;

	if (_element.innerHTML && _element.style) {
		if (_element.innerHTML == "EXIT SEARCH") {
			_element.innerHTML = "SEARCH";
			_element.style.color = "black";
		}
	} else {
		alert('No go!')
	}

}

function search_text() {

	var _element = getDivRef('searchtext','controls');
	var menulocation;

	if (_element.innerHTML && _element.style) {
		if (_element.innerHTML == "SEARCH") {
			menulocation = top.menuloc.location;
			menulocation += '';	//Converts top.menuloc.location to a string

			if (menulocation.indexOf("akd3524") == -1) {
				top._menu_location = "../menus/akd3523_menu.html";
			} else {
				top._menu_location = "../menus/akd3524_menu.html";
			}
			_element.innerHTML = "EXIT SEARCH";
			_element.style.color = "red";
			top.menuloc.location = "../search/search.html";
		} else {
			_element.innerHTML = "SEARCH";
			_element.style.color = "black";
			top.menuloc.location = top._menu_location;
		}
	} else {
		alert('No go!');
	}

	var _element1 = getDivRef('main',0);
	var _element2 = getDivRef('menutext','controls')

	if (_element1.cols) {
		switch (_element1.cols) {
			case _frame_menu_closed:
				_element1.cols = top._frame_menu_open;
				_element2.style.color = "black";
				break;
			default:
		}
	} else {
		alert('No go')
	}

}

function saveConfig() {

	_value =	top._frame_menu_width							+ "|" +
				top._frame_print_height							+ "|" +
				top._frame_display_heights						+ "|" +
				top._save_config_on_exit						+ "|" +
				top._save_config_nag								+ "|" +
				top._illustration_scale;

	SetCookie ("akd_partslist", _value, top._cookie_length)
	if (top._save_config_nag == 1) {
		alert("Parts List Configuration Saved.\n(Note: This reminder can be turned off in the Parts List Configuration Section)");
	}
}

function savePrintConfig() {
	top._linespacing				= top.print_frame.document.print_form.linespacing.value;
	top._illustration_height	= top.print_frame.document.print_form.height.value;
	top._print_preview_width	= top.print_frame.document.print_form.print_preview_width.value;
	top._print_preview_height	= top.print_frame.document.print_form.print_preview_height.value;

	_value =	top._linespacing							+ "|" +
				top._illustration_height				+ "|" +
				top._print_preview_width				+ "|" +
				top._print_preview_height;

	SetCookie ("akd_partslist_print", _value, top._cookie_length)
	alert("Print Configuration saved.")
}

function resetConfig() {
	if (window.confirm('Are you sure you want to reset your Configuration Settings?')) {
		default_values();
		saveConfig();
		top._save_config_on_exit = 0;
		document.location = document.location;
	}
}

function default_values() {

	_frame_menu_width			= "25%";
	_frame_print_height		= "30%";
	_frame_display_heights	= "48.5%,48.5%,3%";
	_save_config_on_exit		= 1;
	_save_config_nag			= 1;
	_illustration_scale		= 1;

}

function load_setup() {

// Set Print Control Frame to saved values
	try {
		top.print_frame.document.print_form.linespacing.value	= _linespacing;
		top.print_frame.document.print_form.height.value		= _illustration_height;
		top.print_frame.document.print_form.print_preview_width.value		= _print_preview_width;
		top.print_frame.document.print_form.print_preview_height.value		= _print_preview_height;
	} catch (e) {}

// Set Frames to saved values
	_frame_menu_open		= _frame_menu_width + "," + (100-parseInt(_frame_menu_width)) + "%";
	_frame_menu_closed	= "0%,100%";
	_frame_print_open		= (100-parseInt(_frame_print_height)) + "%," + _frame_print_height;
	_frame_print_closed	= "100%,0%";

	var _element		= getDivRef('main',0);
	_element.cols		= _frame_menu_open;

	_element		= getDivRef('menu',0);
	_element.rows		= _frame_print_closed;

	_element	= getDivRef('display',0);
	_element.rows	= _frame_display_heights;

}

function load_config_panel() {
	if (top._save_config_on_exit == 0) {
		top.partslist.document.config_form.save_config[0].checked	= false;
		top.partslist.document.config_form.save_config[1].checked	= true;
	} else {
		top.partslist.document.config_form.save_config[0].checked	= true;
		top.partslist.document.config_form.save_config[1].checked	= false;
	}
	if (top._save_config_nag == 0) {
		top.partslist.document.config_form.save_config_nag[0].checked	= false;
		top.partslist.document.config_form.save_config_nag[1].checked	= true;
	} else {
		top.partslist.document.config_form.save_config_nag[0].checked	= true;
		top.partslist.document.config_form.save_config_nag[1].checked	= false;
	}

	top.partslist.document.config_form.illustration_scale.value	= parseInt(top._illustration_scale*100);

	top.partslist.document.config_form.menu_frame_width.value	= parseInt(top._frame_menu_width);
	top.partslist.document.config_form.print_frame_height.value	= parseInt(top._frame_print_height);

}

function print_frames(_partslist, _partsimage, _linespacing, _illustration_height, _preview_width, _preview_height) {
	if (_linespacing == "" || _illustration_height == "" || _preview_height == "" || _preview_width == "") {
		alert("All values must be filled in!");
		return;
	}

	top._linespacing = _linespacing;
	top._illustration_height = _illustration_height;
	_illustration_height = parseInt(_illustration_height);
	top._illustration_width = Math.round(768/1033*_illustration_height);

	if (_partslist) {
		_partslist_window = window.open(top.partslist.location,'data_window','width='+_preview_width+',height='+_preview_height+',toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes,left=0,top=0,screenX=0,screenY=0');
	}
	if (_partsimage) {
		_partsimage_window = window.open(top.illustrations.location,'illustration_window','width='+_preview_width+',height='+_preview_height+',toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes,left=100,top=0,screenX=100,screenY=0');
	}
}
