var Stroage = function(chrome){
	this.chrome = chrome;

	this.storeval = function(key,val,func= undefined){
		if(func != undefined){
			chrome.storage.local.set({
				key:val},func());
		}else{
			chrome.storage.local.set({
				key:val});
		}
	}
	this.getstoredval = function(key,func=undefined){
		if(func != undefined){
			chrome.storage.local.get({key},func());
		}else{
			chrome.storage.local.get({key});
		}
	}
}