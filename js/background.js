var summoned = false;
var charctereditor = false;
var notepadeditor = false;


function connection()
{
  var passing;
  chrome.runtime.onConnect.addListener(function (ported){
  this.port = ported;
    if (ported.name === "popup"){
      ported.onMessage.addListener(function(msg){
//        setInterval(function (){setpopmsg(msg.popupMessage);},100);
        console.log(msg.popupMessage);
        passing = msg.popupMessage;
      });
      
    }
    // if(ported.name === "workingpage"){
    //   ported.onMessage.addListener(function(msg){
        
    //     console.log(msg.workingMessage);
    //     if(passing != null || passing != undefined){
    //       ported.postMessage({backgrounds:v});
    //     }
    //   });
    // }
  });
}

connection();