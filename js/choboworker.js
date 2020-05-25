var htm = document.querySelector('html');
var bod = document.querySelector("body");
var h1 = document.createElement("h1");





// var i = 0;
// var j = 0;
// bod.appendChild(h1);
// var port=chrome.runtime.connect({name:"choboworker"});


// console.log(Script);

// function sendConnection(val,func)
// {
  
//   port.postMessage({workingMessage:val});
 
// }

// function communication(func){
// 	port.onMessage.addListener(function (msg){
//     k = msg.backgrounds;
    
//     if(k !== undefined){
//       if(k===true){
//         rn = k;
//         doitonce = true;
//       }else if(k === false){
//         rn= k;
//       }
//     }

//     func(k);  
//   });
// }




// chrome.storage.local.set({
// 	'x':"Hello"},function(){
// 	});

// 	chrome.storage.local.set({
// 		"y":"BEEE"
// 	});

// 	chrome.storage.local.get(['x'],function(result){
		
// 		h1.innerHTML = result.x;
// 	});

// 	chrome.storage.local.get(['y'],function(result){
		
// 		h1.innerHTML +=" "+result.y;
// 	});
console.log("dhfkajhdskfljhfda");
window.tes = document.createElement("div");
window.tes.setAttribute("data-mover","thisdata");
window.tes.setAttribute("class","datamoving");
window.tes.setAttribute("onload","movedata()")

window.doneseenit = document.createElement("div");
window.doneseenit.setAttribute("data-doneseen","unseen");
window.doneseenit.setAttribute("class","sightretainer");

window.processDirection = document.createElement("div");
window.processDirection.setAttribute("data-direction","noproc");
window.processDirection.setAttribute("class","directionproc");

window.movingdiv = document.createElement("div");
window.movingdiv.setAttribute("data-moving","moving");
window.movingdiv.setAttribute("class","onthemove");

window.debug = document.createElement("div");
window.debug.setAttribute("data-debug","debug");
window.debug.setAttribute("class","debugging");
//window.doneseenit.setAttribute("class","sightretainer");

bod.appendChild(window.tes);
bod.appendChild(window.doneseenit);
bod.appendChild(window.processDirection);
bod.appendChild(window.movingdiv);
bod.appendChild(window.debug);


//chocoWebNetwork.sendMessage("choboworker","test here");

// for(var [key,val] of Object.entries(chobosys)){
// 		bod.appendChild(new Script(val,"async head"));
// }
console.log(window);