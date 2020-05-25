var clicklist = {"character":"character",
							"items":"items",
							"duty":"duty",
							"quests":"quests",
							"crafting":"crafting",
							"gathering":"gathering",
							"achievements":"achievements",
							"shops":"shops",
							"textcommands":"textcommands",
							"notes":"notes",
							"listen":"listen",
							"summon":"summon",
							"chobotemsexit":"chobotemsexit"};
var choboitems;
var summoned =  chrome.extension.getBackgroundPage().summoned;
var port=chrome.runtime.connect({name:"popup"});

function sendmessage(val)
{
  port.postMessage({popupMessage:val});
 
}
function recivemessage(){
	 port.onMessage.addListener(function (msg){
    //console.log(msg.passing);
    //port.postMessage({passing:"here"});
     //messgages.innerHTML=msg;
     console.log(msg);
    
  });
}

function summon(){
  //
  if(!summoned){
    //alert('opened');
    chrome.extension.getBackgroundPage().summoned = true;
    sendConnection("here");
    chrome.tabs.executeScript({file:"js/workingpage.js"});
  }
}

function sendback(){
  chrome.extension.getBackgroundPage().summoned = false;
  sendConnection("out");
  chrome.tabs.executeScript({file:"js/workingpage.js"});
}


function getchobolistitem(par,event){

	var isopen = false;

	console.log(choboitems,par);
	

	if(par != "chobotemsexit")
		choboitems = document.querySelector(".choboitems > #"+par+"  > ul ");
	
	var choboexit = document.querySelector("#chobotemsexit");
	console.log(choboitems,par);
	

	if(choboitems != undefined){
		if(choboitems.getAttribute("data-opened") == undefined){
			choboitems.setAttribute("data-opened","open");
			
		}


		if(!isopen){
			toogleClass(choboitems,"querylistopen","add");
			toogleClass(choboitems,"querylistclose","remove");
			toogleClass(choboexit,"chobotemsexitopen","add");
			toogleClass(choboexit,"chobotemsexitclose","remove");
			isopen = true;
			choboexit.addEventListener('click',exit);
		}
		function exit(){
			if(isopen){
				toogleClass(choboitems,"querylistclose","add");
			 	toogleClass(choboitems,"querylistopen","remove");

			 	toogleClass(choboexit,"chobotemsexitclose","add");
			 	toogleClass(choboexit,"chobotemsexitopen","remove");
			 	
				choboitems.removeAttribute("data-opened");
				isopen = false;
				
			}else{
				choboexit.removeEventListener('click',exit);
			}
		}
	}
	//else{
	// 	toogleClass(choboitems,"querylistclose","add");
	// 	toogleClass(choboitems,"querylistopen","remove");
	// }
	return isopen;

}

function toogleClass(elem,classname,action){
	//var el = document.getElementsByClassname(elem);
	if(action == "remove"){
		if(elem.classList.contains(classname)){
			elem.classList.remove(classname);
		}
	}else if(action == "add"){
		if(!elem.classList.contains(classname)){
			elem.classList.add(classname);
		}
	}

}


function eventaction(act,what){

	console.log(clicklist[what])
	var item = document.getElementById(clicklist[what]);
	var choboexit = document.querySelector("#chobotemsexit");
	var s;
	
	var mousecount = 0;
	function dothis(e){
		item = document.getElementById(clicklist[what]);
		var isopened = false;
		console.log(e,clicklist[what]);
		if(e.type === "click"){
			clearTimeout(s);
			getchobolistitem(item.id,e);
		}
		if(e.type === "mouseover"){
			
			s=setTimeout(function(){
				
				getchobolistitem(item.id,e);
							
				clearTimeout(s);
			},2500);
			clearTimeout(s);
		}
		if(e.type == "mouseleave"){
			clearTimeout(s);
		}
	}

			
	item.addEventListener(act,dothis);
	if(item.getAttribute("id") != "chobotemsexit"){ 	
		
	}
	//item.removeEventListener(act,dothis);
	
}

function Events(){
	eventaction('click',"character");
	eventaction('click',"items");
	eventaction('click',"duty");
	eventaction('click',"quests");
	eventaction('click',"crafting");
	eventaction('click',"gathering");
	eventaction('click',"achievements");
	eventaction('click',"shops");
	eventaction('click',"textcommands");
	eventaction('click',"notes");

}

function com(){
	recivemessage();
}

function chobomain(){
	var body = document.querySelector("body");

	Events();
	sendmessage("test")
	com();

}


chobomain();






document.addEventListener('DOMContentLoaded',function(){

});
