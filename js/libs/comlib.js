class BackgroundMessage{
  constructor(namecon){
    this.port = chrome.runtime.connect({name:namecon});
    this.passing;
    this.name = namecon;
    this.from = "";
    this.sendorder = 0;
    
  }
  sendMessage = function(from="",message="",info={}){
    this.from = from;
    if (typeof message === {}){
      this.port.postMessage({from:this.from,value:message});
    }
    else if(typeof message === function() {} || typeof info === {}){
      if(info != undefined || info != ""){
        this.port.postMessage({from:this.from,info});
      }else{
        this.port.postMessage({from:this.from, value: message, interface:interfaceing});
      }
    }
    else if(typeof message === "string"){
      this.port.postMessage({from:this.from,value:message});
    }
    else{
      this.port.postMessage({from:this.from,value:message});
    }

    this.sendorder++;
  }
  receive = function(func){
    this.port.onMessage.addListener(function (msg){
    //console.log(msg.from);

      if(msg != undefined){
        ///console.log(msg);
        if(func != undefined || func != "" || func != undefined){
          console.log(lib.sendcounter);
          func(this.port,msg);
        }
      }
    });
  }
  interface = function(info){
    let m = this;
    this.port.onMessage.addListener(function(msg){
      console.log(msg);
      if(msg != undefined){
        if(info != undefined || info != null || typeof info === {})
          m.sendMessage("",info);
      }
    })   
  }
}


class CreatorClass{
  constructor(){
    this.obj;
  }
  createobject =  function(elm){
   this.obj = document.createElement(elm);
  }

  appendobj = function(obj){
    this.obj.appendChild(obj);
  }
  addcontent = function(content){
    this.obj.innerHTML += content;
  }

  where = function(dom){
    console.log(dom);
    if(dom != undefined){
      if(dom.length > 0){
          for(var i of dom){
            i.appendChild(this.obj);
          }
      }else
          dom.appendChild(this.obj);
    }
  }

  sendobject = function(){
    return this.obj;
  }
}

class GetterClass{
  constructor(dom){
    this.dom = dom;
    this.obj;
  }


  addtoelement = function(elem,what){
    var thing = document.querySelectorAll(elem);
    thing.append(what);
  }

  sendtoapp = function(){
    return this.dom;
  }
}


class Doingwhat{
  constructor(dom){
    this.shipout = "test";
    this.dom = dom;
  }

  create = function(){
    let comarry = [];
    let commalocation = [];
    let outstr = "";
    // was funWithActions
    var createelems = new CreatorClass();
    var cont = 0;
    var correction = [];
    var arr = [];
    var old = "";
    var wherearray = [];
    var wherepos = -1;
    var lastwhere = 0;
    var whereflags = [false,false,false];
    console.log(this.dom);
    if(typeof this.dom === "array"){
      for(var i of this.dom){
        if(String(i).match(/</)){
          correction.push(String(i).replace(/(\r\n|\n|\t)/gm,""));
        }
      }
    }
  }
}

var chocoWebNetwork = new BackgroundMessage("chocowebnetwork");