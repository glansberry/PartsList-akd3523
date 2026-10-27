function clear_search_text(){

	var _element = top.getDivRef('searchtext','controls');

	if (_element.innerHTML && _element.style) {
		if (_element.innerHTML == "EXIT SEARCH") {
			_element.innerHTML = "SEARCH";
			_element.style.color = "black";
		}
	} else {
		alert('No go!');
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
