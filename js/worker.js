var head = document.querySelector("head");
var scripts = {
	"comlib":"comlib.js",
	"storage":"storageclass.js"}
var Script = function(file,loc){
	this.script = document.createElement("script");
	this.script.setAttribute("class","choboscripts");
	this.script.setAttribute("type","text/javascript");
	if( file != "none"){

		if(loc === "head")
			this.script.setAttribute("src",chrome.extension.getURL("js/libs/"+file));
		else if(loc === "body"){
			this.script.setAttribute("src",chrome.extension.getURL("app/choboscripts/"+file));
			this.script.setAttribute("aysnc","");
		}else if(loc === "async head"){
			this.script.setAttribute("src",chrome.extension.getURL("app/choboscripts/"+file));
			this.script.setAttribute("aysnc","");
		}else if(loc === "na"){
			this.script.setAttribute("src",chrome.extension.getURL(file));
			this.script.setAttribute("aysnc","");
		}else if(loc === ""){
			this.script.setAttribute("src",chrome.extension.getURL(file));
		}
	}else{
		this.script.innerHTML = loc;
	}
	return this.script;
}

var Loader = {
	"choboid":"window.choboid = 'chrome-extension://"+chrome.runtime.id+"'",
	"testor":"var testing = false;"
}



for(var [key,val] of Object.entries(Loader)){

	head.appendChild(new Script("none",val));
}

// for(var [key,val] of Object.entries(scripts)){
// 	console.log(val);+
// 	head.appendChild(new Script(val,"head"));
// }






