let chobosys = {"chobochateredit":"chobochateredit.js",
                "doneseenit":"choboObject/doneseenit.js",
                "procdir":"directionprocessing.js"
                }
let brainsys = {"brainprocess":"brainprocess.js",
                "sightprocess":"sightprocess.js",
                "hearingprocess":"hearingprocess.js"
                }

var bod = document.querySelector("body");


var tagcounter = 0;
var attcounter = 0;
var classcounter = 0;
var Helper = function(){
  this.classelem = [];
  this.attelem = [];
  this.tagelem = [];

  this.checkdoubles = function(elem,whatatt,elemname){
    var name = "";
    var attcount = 0;
    if(this.classelem.length >0 && whatatt === "class"){
      for(var [i,elemi] of Object.entries(this.classelem)){
        if(elemi != elem){
          name = elem.classList.item(0)+classcounter;
          if(elemi.classList.item(0) != elemname){
            classcounter++;
          }
        }
      }
    } 
    if(this.attelem.length >0 && whatatt === "attribute"){
      for(var [i,elemi] of Object.entries(this.attelem)){
        if(elemi != elem){
          
          for(var [j,att]  of Object.entries(elemi.attributes)){
            if(elemi.getAttribute(""+att.name) === elemname){
              name = elemi.getAttribute(""+att.name)+attcount;
               attcount++;
              break;
            }else{
              name = elemi.getAttribute(""+att.name);
            }
           
          }
        }
      }
    }    
    if(this.tagelem.length >0 && whatatt === "tagname"){
      for(var [i,elemi] of Object.entries(this.tagelem)){
        if(elemi[i] != elem){
          if(elemi.tagName != ""||elemi.tagName != null || elemi.tagName != undefined){
            if(!elem.hasOwnProperty(elem) ){
              //this.checkdoubles(elem);
              name = elem.tagName+tagcounter;
              tagcounter++;
            }
            //tagcounter++;
          }
        }
      }
    }
    return name;
  }
  this.getwhat = function(elem){
    this.name = "";

    if(elem.getAttribute("id") != undefined){
      this.name = elem.getAttribute("id"); 
    }
    else{
      if(elem.getAttribute("class") != undefined){
        this.classelem.push(elem);
        //this.name = elem.classList.item(0)+classcounter;
        //classcounter++;
      }else{
        if(elem.attributes.length > 0){
          //console.log(elem.attributes,elem);
          for(var i = 0; i < elem.attributes.length; i++){
            if(elem.attributes[i] != "style" || elem.attributes[i].name != "class" || elem.attributes[i].name != "id"){
              this.attelem.push(elem);
              //this.name = elem.getAttribute(""+elem.attributes[i].name);
            }
          }
          if(elem.attributes.length === 1){
            if(elem.attributes[0].name === "style"){
              if(elem.tagName != ""||elem.tagName != null || elem.tagName != undefined){
                if(!elem.hasOwnProperty(elem) ){
                  this.tagelem.push(elem);
                  //this.name = elem.tagName+tagcounter;
                }
                //tagcounter++;
              }
            }
          }
        }else{
      
          if(elem.tagName != ""||elem.tagName != null || elem.tagName != undefined){
            if(!elem.hasOwnProperty(elem) ){
              this.tagelem.push(elem);
              //this.name = elem.tagName+tagcounter;
            }
            //tagcounter++;
          }
        }
      }
    }


    if(elem.getAttribute("id") != undefined){
      this.name = elem.getAttribute("id"); 
    }
    else{
      if(elem.getAttribute("class") != undefined){
         this.name = this.checkdoubles(elem,"class",elem.classList.item(0)+classcounter);
        //this.name = elem.classList.item(0)+classcounter;
        //classcounter++;
      }else{
        if(elem.attributes.length > 0){
          //console.log(elem.attributes,elem);
          for(var i = 0; i < elem.attributes.length; i++){
            if(elem.attributes[i] != "style" || elem.attributes[i].name != "class" || elem.attributes[i].name != "id"){
               this.name = this.checkdoubles(elem,"attribute",elem.getAttribute(""+elem.attributes[i].name));
              //this.name = elem.getAttribute(""+elem.attributes[i].name);
            }
          }
          if(elem.attributes.length === 1){
            if(elem.attributes[0].name === "style"){
              if(elem.tagName != ""||elem.tagName != null || elem.tagName != undefined){
                if(!elem.hasOwnProperty(elem) ){
                  this.name = this.checkdoubles(elem,"tagname",elem.tagName);
                  //this.name = elem.tagName+tagcounter;
                }
                //tagcounter++;
              }
            }
          }
        }else{
      
          if(elem.tagName != ""||elem.tagName != null || elem.tagName != undefined){
            if(!elem.hasOwnProperty(elem) ){
              this.name = this.checkdoubles(elem,"tagname",elem.tagName);
              //this.name = elem.tagName+tagcounter;
            }
            //tagcounter++;
          }
        }
      }
    }

    return this.name;
  }

  this.getcoordsandelem = function(elem,name){
    this.coord = {};
    this.coord[name] = {name:elem.getBoundingClientRect(),"elem":elem};

    return this.coord;
  }

  this.getByCoords = function(elem,name){
    this.coordx = {};
    this.coordy = {};
    var x = elem.getBoundingClientRect().x;
    var y = elem.getBoundingClientRect().y;
    var name =  name;
    this.coordx[x] = {elem:elem};
    this.coordy[y] = {elem:elem};

    return {"x":this.coordx,"y":this.coordy}
  }

  this.stringify = function(obj){
    var extractelem = new Doingwhat(obj);
    var elems = {};
    var elemsin = {};
    //extractelem.create()
    console.log(obj);
    if(typeof obj === "object"){
      for(var [key,elem] of Object.entries(obj)){
        if(typeof elem != "object"){
          var name = this.getwhat(elem);
          var id = elem.getAttribute("id");
          var clas = elem.getAttribute("class");
          var data = elem.attributes;
          var dataencode = {};
          //console.log(elem.getBoundingClientRect());
          for(var [keyi,value] of Object.entries(data)){
            
              var o = {"name":value.name,"value":value.value};
              dataencode[name] = o;
   
            
          }
          var innertext = elem.innerHTML;
          var encode = encodeURIComponent(innertext)
          elems[name] = {"name":name,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elem.getBoundingClientRect()};
       
        } 
        else{
           //console.log(key,Object.keys(elem),elem[key]);
           for(var [keyj, elemj] of Object.entries(elem)){
              // console.log(keyj,elemj)
              var name = this.getwhat(elemj);
              var id = elemj.getAttribute("id");
              var clas = elemj.getAttribute("class");
              var data = elemj.attributes;
              var dataencode = {};
              //console.log(elem.getBoundingClientRect());
              for(var [keyi,value] of Object.entries(data)){
                
                  var o = {"name":value.name,"value":value.value};
                  dataencode[name] = o;
       
                
              }
              var innertext = elemj.innerHTML;
              var encode = encodeURIComponent(innertext)
              elemsin[name] = {"name":name,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elemj.getBoundingClientRect()};
           
           }
           //console.log(key);
           elems[key] = elemsin; 
        }
          
         
        // else
        //   elems[key] = {"name":key,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elem.getBoundingClientRect()};
        // //elems[name] = {"id":elem}
      }
    }
    //console.log(elems);
    return elems;
  }

  
}
var ChoboCharacter = function(startx,starty,width,height){
	var self = this;
	self.x=.00;
  self.y=.00;
  self.z = .00;
  self.startY = starty;
  self.startX = startx;
  self.magy=0;
  self.magx = 0;
  self.SPEED = .3;
  this.SPEED = self.SPEED;
  self.width = width;
  self.height = height;
  self.background="pink";
  self.backgroundSize="30px";
  self.boundriesX = 0;
  self.boundriesY = 0;
  self.halfWidth = width/3;
  self.halfHeight = height/3;
  self.borders = {"left":false,"right":false,"top":false,"bottom":false}
  self.outside = false;
  
  
  self.cdiv = document.createElement('div');
  self.cdiv.setAttribute('id','chobochar');
  self.cdiv.style.position = "fixed";
  self.cdiv.style.zIndex = "100000";
  self.movingdir = 0;
  self.style = self.cdiv.style;

  self.brain = document.createElement('div');
  self.brain.setAttribute('id','brain');
  self.brain.setAttribute('class','brainclass');
  self.brain.setAttribute('data-posx',self.x);
  self.brain.setAttribute('data-posy',self.y);


  self.sight = document.createElement('div');
  self.sight.setAttribute('id','sight');
  self.sight.setAttribute('class','brainsubclass'); 

  self.hearing = document.createElement('div');
  self.hearing.setAttribute('id','hearing');
  self.hearing.setAttribute('class','brainsubclass'); 

  self.speaking = document.createElement('div');
  self.speaking.setAttribute('id','speaking');
  self.speaking.setAttribute('class','brainsubclass');


  self.brain.appendChild(self.sight);  
  self.brain.appendChild(self.hearing);  
  self.brain.appendChild(self.speaking);  

  self.touch = document.createElement('div');
  self.touch.setAttribute('id','touch');
  self.touch.setAttribute('class','brainclass');


  self.thridbrain = document.createElement('div');
  self.thridbrain.setAttribute('id','thirdbrain');
  self.thridbrain.setAttribute('class','brainclass');


  self.thrideye = document.createElement('div');
  self.thrideye.setAttribute('id','thirdeye');
  self.thrideye.setAttribute('class','brainsubclass');

  self.thirdtongue = document.createElement('div');
  self.thirdtongue.setAttribute('id','thirdtongue');
  self.thirdtongue.setAttribute('class','brainsubclass');  


  self.skin = document.createElement('canvas');
  self.skin.setAttribute('id','chobocanvas');
  self.skin.style.position = "absolute";
  self.skin.style.zIndex = "1000";
  self.cdiv.appendChild(self.skin);
  self.cdiv.appendChild(self.brain);
  self.cdiv.appendChild(self.thridbrain);


  // self.adventurewindow = document.createElement('div');
  // self.adventurepanel = document.createElement('div');

  // self.adventurewindow.style.position = "fixed";
  // self.adventurewindow.style.zIndex = "100000000000000000";
  // self.adventurewindow.setAttribute("id","venturewin");

  // self.adventurewindow.appendChild(self.adventurepanel);

  self.minY = {};
  self.minX = {};
  self.maxY = {};
  self.maxX = {};
  self.xcoordmax = {};
  self.ycoordmin = {};
  self.xcoordmin = {};
  self.ycoordmax = {};
  self.coord = {};

  self.sighttimer = document.createElement("input");
  self.sighttimer.setAttribute("id","seeing");
  self.sighttimer.setAttribute("type","checkbox");
  self.seen = [];
  self.sriptsaa = [new Script(chobosys["chobochateredit"],"async head"),
    new Script(chobosys["doneseenit"],"async head"),
    new Script(chobosys["procdir"],"async head")];
  self.brainscripts = [new Script(brainsys["brainprocess"],"body")];
  self.helper = new Helper();
  self.moveevent = new  Event("moving",{"bubbles":true});
  self.phatoms = {};

  //self.cdiv.appendChild(self.sighttimer);
  self.setSpeed = function(speed){
    self.SPEED = speed;
  }
  self.getSpeedx = function(mag){

    if(self.magx != 0)
      return self.SPEED;
    else
      return 0.00;
  }
  self.getSpeedy = function(){
    if(self.magy != 0)
      return self.SPEED;
    else
      return 0.00;
    
  }
  self.startingPos = function(x,y){
    self.startx = x;
    self.starty = y;
    //self.update();
  }

  self.brainprocess = function(){
    var bod = document.getElementsByTagName("body")[0];
    var brainproc = document.createElement("script");

    for(var [key,val] of Object.entries(brainsys)){
      bod.appendChild(new Script(val,"body"));
    }


  }
  // self.move = function(x,y,magx,magy){
  //   self.magx = magx;
  //   self.magy = magy;
  //   self.update();

  //   self.x = ((x)*self.magx)+self.x;
  //   self.y = ((y)*self.magy)+self.y;
  //   // self.x = x;
  //   // self.y = y;
  //   self.cdiv.style.transform = "translate("+self.x+"px,"+self.y+"px)";
  //   self.update();
  // };
  // self.magitude =function(x,y,magx,magy){
  //   self.magx = magx;
  //   self.magy = magy;
  //   ////console.log(self.y,"k");
  //   self.x = ((x)*self.magx)+self.x;
  //   self.y = ((y)*self.magy)+self.y;
  
  //   self.cdiv.style.transform = "translate("+(self.x*self.SPEED)+"px,"+(self.y*self.SPEED)+"px)";
    
  //   self.update();
  // }
  self.move = function(x,y,magx,magy){
    
    self.magx = magx;
    self.magy = magy;
    self.x += ((x));
    self.y += ((y));
    self.moveevent = new  Event("moving",{"bubbles":true});
    var charact = document.getElementsByClassName("onthemove")[0];
    if(self.moveevent != null | self.moveevent != undefined)
    charact.dispatchEvent(self.moveevent);
    if(self.magx != 0 || self.magy != 0){
      charact.innerHTML = "moving";
    }else{
      charact.innerHTML = "";
    }
    //self.cdiv.style.transform = "translate("+self.x+"px,"+self.y+"px)";
    //self.update();
  };
  self.magitude =function(x,y,magx,magy){
    self.magx = magx;
    self.magy = magy;
    ////console.log(self.y,"k");
    self.x = ((x)*self.magx)+self.x;
    self.y = ((y)*self.magy)+self.y;

    // self.update();
  }

  self.see = function(){

    bod = document.querySelector("body");
    var x = self.x-bod.getClientRects()[0].right;
    var y = self.y-bod.getClientRects()[0].height;
   
    //var event = new Event('change',{"bubbles":true ,"cancelable":false});

    ////console.log(self.cdiv.getBoundingClientRect().y);
    //console.log(bod);
    var arr = []
    var arrG = [];
    var arrtwo = [];
    var outarr = [];


    ////console.log(sriptsaa);
    bod.appendChild(self.sriptsaa[0]);
    function grandchild(par){
      var innerarr = [];
      ////console.log(par)
      for(var [j,elemj] of Object.entries(par)){
        if(elemj.nodeName != "META" || elemj.tagName != "META"){ 
          if(elemj.nodeName != "STYLE" || elemj.tagName != "STYLE"){ 
            if(elemj.nodeName != "LINK" || elemj.tagName != "LINK"){ 
              if(elemj.nodeName != "SCRIPT" || elemj.tagName != "SCRIPT"){
                if(elemj.nodeName != "IFRAME" || elemj.tagName != "IFRAME"){
                  if(elemj.nodeName != "B" || elemj.tagName != "B"){

                    arrG.push(elemj);
                    if(elemj.childElementCount > 0){
                      arrG = grandchild(elemj.children);
                    }else{
                      for(var [k,elemk] of Object.entries(grandchild(elemj.children))){
                        arrG.push(elemk);
                        arrG.push(grandchild(elemk.children));

                      }
                    }

                  }
                }
              }
            }
          }
        }
      }
      return arrG;
    }
    // function innerchild(child=undefined){
    //    if(child ===  undefined){
    //     child = bod.children;
    //   }
    //   for(var [i,elem] of Object.entries(child)){

    //     if(elem.nodeName != "META" || elem.tagName != "META"){ 
    //       if(elem.nodeName != "STYLE" || elem.tagName != "STYLE"){ 
    //         if(elem.nodeName != "LINK" || elem.tagName != "LINK"){ 
    //           if(elem.nodeName != "SCRIPT" || elem.tagName != "SCRIPT"){
    //             if(elem.nodeName != "IFRAME" || elem.tagName != "IFRAME"){
    //               if(elem.nodeName != "B" || elem.tagName != "B"){

    //                 if(elem.nodeType != 3){
    //                   if(elem.childElementCount <=0){
    //                     //console.log(elem.childElementCount,elem,"i"+i);
    //                     arr.push(elem);
    //                     innerchild(elem.children);
                       
    //                   }else{
    //                     arr.push(elem);
    //                     var p = innerchild(elem.children)
    //                     var child = grandchild(elem.children);
    //                     //console.log(p,child);
    //                   }

    //                 }

    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return arr;
    // }
    function innerchild(child=undefined){
      var g = [];
      
      if(child ===  undefined){
        child = bod.children;
      }else if(child.length < 0){
        child = bod.children;
      }else{
        child = child;
      }
      //console.log(child);
      for(var [i,elem] of Object.entries(child)){

        if(elem.nodeName != "META" || elem.tagName != "META"){ 
          if(elem.nodeName != "STYLE" || elem.tagName != "STYLE"){ 
            if(elem.nodeName != "LINK" || elem.tagName != "LINK"){ 
             if(elem.nodeName != "SCRIPT" || elem.tagName != "SCRIPT"){
              if(elem.nodeName != "IFRAME" || elem.tagName != "IFRAME"){
                if(elem.nodeName != "B" || elem.tagName != "B"){

              
                  if(elem.nodeType != 3){
                    if(elem.childElementCount >0){
                      ////console.log(elem.childElementCount,elem,"i"+i);
                      arr.push(elem);
                      arr = innerchild(elem.children);
                      
                    }else{
                      arr.push(elem);
                      ////console.log(elem.childElementCount,elem,"i"+i);

                      for(var [j,elemj] of Object.entries(elem.children)){
                           if(elem.nodeName != "META" || elem.tagName != "META"){ 
                            if(elem.nodeName != "STYLE" || elem.tagName != "STYLE"){ 
                              if(elem.nodeName != "LINK" || elem.tagName != "LINK"){ 
                               if(elem.nodeName != "SCRIPT" || elem.tagName != "SCRIPT"){
                                if(elem.nodeName != "IFRAME" || elem.tagName != "IFRAME"){
                                  if(elem.nodeName != "B" || elem.tagName != "B"){
                                  
                                    if(elemj.childElementCount > 0){
                                      //onsole.log(elemj.childElementCount,elemj,"j"+j);
                                      arr.push(elemj);
                                      arr = innerchild(elemj.children);
                                      
                                    }else{
                                      ////console.log(elemj.childElementCount,elemj,"j"+j);
                                      g = grandchild(elemj.children);
                                      //countj++;
                                      //console.log(g);
                                      arr.push(elemj);
                                    }
                                  }
                                  
                                }
                              }
                            }
                          }
                        }
                      }

                    
                    }

                    }
                  }
                }
              }
            }
          }
        }
     
      }

      for(var [i,elem] of Object.entries(g)){
        arr.push(elem);
      }

      //self.sighttimer.dispatchEvent(event);
      return arr;
    }
    arrtwo = innerchild();
    var json = JSON.stringify(self.helper.stringify(arrtwo));

    //console.log(arrtwo);

    var s = setInterval(async () =>{

      
      ////console.log(arrtwo);
      //outarr = innerchild(arrtwo);
      var out = setTimeout(async () =>{
      // var event = new CustomEvent('seenit');
        // outarr.dispatchEvent(event);
        setTimeout(async ()=>{
      // var event = new CustomEvent('seenit');
            self.sighttimer.value = "";
            try{
              
              self.seen = arrtwo;
              //console.log(self.seen);
              //bod.removeChild(self.sriptsaa[0]);
              bod.appendChild(self.sriptsaa[1]);
            }catch(e){

            }
            
            clearTimeout(this);


        },1700);
        clearInterval(s);


      },1500);
    },1000);

    
    return arrtwo;  
  }

  self.collectawareness = function(loc,obj){
    return {loc,obj}
  }
  self.collectawarnessbyval = function(name,obj){
    return {name,obj}
  }
  self.seenit = function(){
    
    return self.seen;
  }

  self.sightprocess = function(){
    var out = {};
    try{
      bod.removeChild(self.sriptsaa[1]);
    }catch(e){

    }
    
    if(self.seenit().length != 0){
      ////console.log(self.seenit());
      for(var i of self.seenit()){
        var name = self.helper.getwhat(i);
        out[name] = self.helper.getByCoords(i,self.helper.getwhat(i));
      }
    }

    return out;
  }
  self.sight = function(elemX,elemY){
    var x = self.cdiv.getClientRects()[0].x;
    var y = self.cdiv.getClientRects()[0].y;
    var sight = 0;
    ////console.log(elemX,elemY);

    if(elemX != undefined && elemY != undefined){
      if(!isNaN(elemX) && !isNaN(elemY)){
        sight = Math.pow((x-elemX),2)+Math.pow((y-elemY),2);
        ////console.log(sight);
      }
    }

    return sight;
  }

  self.perspective = function(){
    ////console.log(self.sightprocess())
    var x = self.cdiv.getClientRects()[0].x;
    var y = self.cdiv.getClientRects()[0].y;
    var outx = {};
    var outy = {};
    var ox = 0;
    var oy = 0;
    for(var [key,elem] of Object.entries(self.sightprocess())){
      ////console.log(key, elem["x"]);
      ox = Object.entries(elem["x"]);
      oy = Object.entries(elem["y"]);

      var xx = Object.keys(elem["x"]);
      // console.log(x,ox,xx);

      if(x > parseFloat(xx)){
        //console.log(x,ox[0][0],ox);
        var xs = Object.keys(elem["x"]);
        self.minX[key] = elem["x"][xs[0]]["elem"]
        self.xcoordmax[key] = xs[0];

      }

      if(x < parseFloat(xx)){
         //console.log(x,ox[0][1],xx);
        var xs = Object.keys(elem["x"]);
        // console.log(xs,elem["x"][xs[0]]);
        self.maxX[key] = elem["x"][xs[0]]["elem"]
        self.xcoordmin[key] = xs[0];

      }

      if(y > parseFloat(oy[0][0])){
         ////console.log(y,oy);
        self.minY[key] = oy[0][1]["elem"];
        self.ycoordmin[key] = oy[0][0]; 


      }

      if(y < parseFloat(oy[0][0])){
         ////console.log(y,oy);
        self.maxY[key] = oy[0][1]["elem"];
        self.ycoordmax[key] = oy[0][0]; 

      }
      
    }

    
    self.coord = {"top":self.ycoordmin,"bottom":self.ycoordmax, "left":self.xcoordmin,"right":self.xcoordmax};
    // self.ycoord = coordy;
    return {"top":self.minY,"bottom":self.maxY,"left":self.minX,"right":self.maxX};
  } 

  self.perspectivebyname = function(){
    ////console.log(self.sightprocess())
    var x = self.cdiv.getClientRects()[0].x;
    var y = self.cdiv.getClientRects()[0].y;
    var ox = 0;
    var oy = 0;
    var coordx = {};
    var coordy = {};
    for(var [key,elem] of Object.entries(self.sightprocess())){
      ////console.log(key, elem["x"]);
      ox = Object.entries(elem["x"]);
      oy = Object.entries(elem["y"]);
      ox = Object.keys(ox);
      console.log(x,ox[0]);

      // if(x > parseFloat(ox[0][0])){
      //   ////console.log(x,ox);
      //   self.minX[key] = ox[0][1]["elem"];
      //   self.xcoordmin[key] = ox[0][0];
      //   // self.xcoord["max"] = {ox[0][0]:new Object()}
      // }

      // if(x < parseFloat(ox[0][0])){
      //    ////console.log(x,ox);
      //   self.maxX[key] = ox[0][1]["elem"];
      //   self.xcoordmax[key] = ox[0][0];
      // }

      // if(y > parseFloat(oy[0][0])){
      //    ////console.log(y,oy);
      //   self.minY[key] = oy[0][1]["elem"];
      //   self.ycoordmin[key] = oy[0][0];
      // }

      // if(y < parseFloat(oy[0][0])){
      //    ////console.log(y,oy);
      //   self.maxY[key] = oy[0][1]["elem"];
      //   self.ycoordmax[key] = oy[0][0];
      // }
    }
    // self.xcoord = coordx;
    // self.ycoord = coordy;

    self.coord = {"top":self.ycoordmin,"bottom":self.ycoordmax, "left":self.xcoordmin,"right":self.xcoordmax};
     return {"top":self.minY,"bottom":self.maxY,"left":self.minX,"right":self.maxX};
  }

  self.seephantoms = function(){
    var aware = self.perspective();
    var pass = {};
    var out = {};
    var b = {};
    var top = [];
    var bottom = [];
    var left = [];
    var right = [];
    var styles = {};
    var stylestop = {};
    var stylesbottom = {};
    var stylesleft = {};
    var stylesright = {};
    
    if(Object.entries(aware).length > 0){
      for(var [key,elem] of Object.entries(aware)){
        //console.log(elem,Object.keys(elem));
        // var h = elem[Object.keys(elem)].getBoundingClientRect().height;
        // var w = elem[Object.keys(elem)].getBoundingClientRect().width;
        // if(h == 0 || w == 0){
            
        //     self.phatoms[key] = elem;
        //     //console.log(elemj);
        //     // delete key;
        //     // delete elem;
        // }else{ 
        //   out[key] = elem;
        // }
        b[key] = {};
        styles[key] = {};
        console.log(key)
        for(var [keyj,elemj] of Object.entries(elem)){
          //console.log(keyj,elemj,elemj.getBoundingClientRect());
          h = elemj.getBoundingClientRect().height;
          w = elemj.getBoundingClientRect().width;
          
          if(h == 0 || w == 0){
            
            self.phatoms[keyj] = elemj;
            //console.log(elemj);
            // delete keyj;
            // delete elemj;
          }else{
            console.log(key,keyj);
            
            if(key === "top"){
              top.push(elemj);
               stylestop[keyj] = window.getComputedStyle(elemj);
            }if(key === "bottom"){
              bottom.push(elemj);
              stylesbottom[keyj] = window.getComputedStyle(elemj);
            }if(key === "left"){
              left.push(elemj);
              stylesleft[keyj] = window.getComputedStyle(elemj);
            }if(key === "right"){
              right.push(elemj);
              stylesright[keyj] = window.getComputedStyle(elemj);
            }
            // b[keyj] = elemj;
            // pass[key] = {keyj,b};  
          
            //out[key] = b;
            //out[key][keyj] = elemj;
          }
          // if(styles[keyj]["background"] != undefined)
          //   console.log(styles[keyj]["background"],elemj);

          // console.log(keyj,elemj.getBoundingClientRect().height,elemj);
        }
         if(key === "top"){
          Object.assign(b[""+key],top);
          Object.assign(styles[key],stylestop);
        }if(key === "bottom"){
         Object.assign(b[""+key],bottom);
         Object.assign(styles[key],stylesbottom);
        }if(key === "left"){
          Object.assign(b[""+key],left)
          Object.assign(styles[key],stylesleft);
        }if(key === "right"){
         Object.assign(b[""+key],right);
         Object.assign(styles[key],stylesright);
        }
          
        //console.log(elem);

      }

     //aware = elem;

    
    }    
    
    console.log(styles);
    if(Object.entries(aware).length > 0){
      for(var [key,elem] of Object.entries(aware)){
        
        for(var [keyj,elemj] of Object.entries(elem)){
          if(styles[key][keyj] != undefined){
           if(styles[key][keyj]["display"] === "none");{
            self.phatoms[keyj] = elemj;
            delete self.phatoms[keyj];
           }
           if(styles[key][keyj]["visiblity"] === "none");{
            self.phatoms[keyj] = elemj;
            delete self.phatoms[keyj];
           }
          }
          
        }
        
      }
    }
    //console.log(styles)
    //pass = {"top":}
    //console.log(self.phatoms);
    // for(var[i,elem] of Object.entries(out)){
     
    //     console.log(i,elem.style.getPropertyValue("text-align"));
    // }
    var json = JSON.stringify(self.helper.stringify(b));
    console.log(self.helper.stringify(b),json);

    console.log(aware,out,b);
  }
  self.awareness = function(){
    
    if(Object.entries(self.perspective()).length > 0)
      return self.perspective();
    else
      return "noting to see";
  }  
  self.awarenessbyval = function(){
    
    if(Object.entries(self.perspectivebyname()).length > 0)
      return self.perspectivebyval();
    else
      return "noting to see";
  }
  
  self.autoupdate = function(x,y,func){
    self.x = x;
    self.y = y;
    func(self.x,self.y);
  }
  // self.direction = function(dirX,dirY){
  //   var result = "";
  //   if(dirX === 1 && dirY ===0){
  //     ////console.log('right');
  //     result = "right";
  //   }else if(dirX === -1 && dirY === 0){
  //     ////console.log('left');
  //     result = "left";
  //   }else if(dirX === 0 && dirY === 1){
  //     ////console.log('down')
  //     result = "down";
  //   }else if(dirX === 0 && dirY === -1){
  //     ////console.log('up');
  //     result = "up";
  //   }
  //   return result;
    
  // }

  self.direction = function(){
    var bod  = document.querySelector("body");
    var processes = document.getElementsByClassName("directionproc")[0];
    var html = '<body>Foo</body>';
    //processes.src = 'data:text/html;charset=utf-8,<html><head></head><body></body>';
    // processes.setAttribute('src',chrome.extension.getURL("app/choboscripts/choboObject/dirchtml.html"))
    // //console.log(processes);
    // var prespective = self.perspective();
    // var s = document.createElement("script");
    // var g = self.seenit();

    //var j = JSON.stringify(self.helper.stringify(self.prespective()));

    //console.log(self.seephantoms());
    //console.log(j);
    //processes.innerHTML = j;
    // s.innerHTML = g;
    // processes.contentWindow.document.body.appendChild(s);
   
    // // processes.head.innerHTML = s ;
    // //console.log(processes.contentWindow);
  

    //processes.innerHTML = self.helper.stringify(self.seenit());
   // //console.log(self.helper.stringify(self.seenit()));
    // for(var [key,elem] of Object.entries(self.helper.stringify(self.seenit()))){
    //   //console.log(key,elem);
    //   if(key != undefined || elem != undefined){
    //     //processes.innerHTML = String(key+","+elem);
    //   }
    // }

    ////console.log("s",self.sriptsaa[2]);
    bod.appendChild(self.sriptsaa[2]);



    // if(self.seenit().length != 0){
    //   ////console.log(self.seenit());
    //   for(var i of self.seenit()){
    //     var name = self.helper.getwhat(i);
    //     //console.log(self.awareness()["top"]);
    //     //out[name] = self.helper.getByCoords(i,self.helper.getwhat(i));
    //   }
    // }
    ////console.log(self.awareness()["top"]);

    // if(self.x > self.awareness()["top"][loc]){
    //   return "top"
    // }
  }
  self.keypress = function(event,func){
    func(event,self);
  }

  self.getCdiv =function(){
	  return self.cdiv;
  }
  self.setbackgroundSize = function(val){
	  self.cdiv.style.backgroundSize = val;
  }
  self.getStyle = function(){
	  return self.cdiv.style;
  }
  self.comeback = function(){
    return self.cdiv.getClientRects();
  };
  self.bondaries = function(html,display){
    ////console.log(html.getBoundingClientRect(), c.cdiv.getBoundingClientRect());
    ////console.log(display);
  /*{"x":xtext,"y":ytext,"left":leftwall,"right":rightwall,"top":topwall,"bottom":bottomwall}*/  
    var xch = (self.width/3)+c.x;
    var ych = (self.height/3)+c.y;
    //halfway -=  self.halfWidth;
    //display["outside"].value = `"html x ,${(html.getBoundingClientRect().x)}, pet ${xch}"`;
    display["x"].value=`"html x ,${(html.getBoundingClientRect().x)}, pet x  ${xch}"`;
    display["y"].value=`"html x ,${(html.getBoundingClientRect().x)}, pet y  ${ych}"`;
    if(xch <= html.getBoundingClientRect().left){
      ////console.log("touched left");
      self.borders["left"] = true;
    }else{
      self.borders["left"] = false;
    }
    if(xch >= (html.getBoundingClientRect().right-self.halfWidth)){
      ////console.log("touched right");
      self.borders["right"] = true;
    }else{
      self.borders["right"] = false;
    }
    if(ych < html.getBoundingClientRect().top){
      self.borders["top"] = true;
    }else{
      self.borders["top"] = false;
    }
    if(ych >= (html.getBoundingClientRect().bottom-self.halfWidth)){
      ////console.log("touched bottom");
      self.borders["bottom"] = true;
    }else{
      self.borders["bottom"] = false;
    }

  }

  self.outofbounds = function(htm){
    if(xch <= html.getBoundingClientRect().left-self.width){
      ////console.log("touched left");
      self.borders["left"] = true;
    }else{
      self.borders["left"] = false;
    }
    if(xch >= (html.getBoundingClientRect().right-self.halfWidth)+self.width){
      ////console.log("touched right");
      self.borders["right"] = true;
    }else{
      self.borders["right"] = false;
    }
    if(ych < html.getBoundingClientRect().top-self.height){
      self.borders["top"] = true;
    }else{
      self.borders["top"] = false;
    }
    if(ych >= (html.getBoundingClientRect().bottom-self.halfWidth)+self.height){
      ////console.log("touched bottom");
      self.borders["bottom"] = true;
    }else{
      self.borders["bottom"] = false;
    }
  }

  self.AI = function(htm,display,func){
    display["left"].value = self.borders["left"];
    display["right"].value = self.borders["right"];
    display["top"].value = self.borders["top"];
    display["bottom"].value = self.borders["bottom"];
    func(self);
  }
  self.draw = function(){
    self.cdiv.style.width = self.width+"px";
    self.cdiv.style.height = self.height+"px";
    self.cdiv.style.background = self.background;
    self.cdiv.style.backgroundSize = self.backgroundSize;
  }
  self.getMagx = function(){
    return self.magx;
  }
  self.posx = 0;
  self.posy = 0;
  self.update = function(){
    var html =  document.getElementsByTagName("html")[0];
    self.x = ((self.startX));
    self.y = ((self.startY));
    // self.magx = self.getMagx();
    var sx = self.cdiv.getBoundingClientRect().x;
    var sy = self.cdiv.getBoundingClientRect().y;

    //console.log(((self.x-(window.innerWidth))*((self.x/(window.innerWidth-self.x)))));
    /*right side of the screen pop out from side*/
    // /var posx = ((self.x-(window.innerWidth))*(self.x/(window.innerWidth))+window.innerWidth);
    // /var posy = ((self.y-(window.innerHeight))*(self.y/(window.innerHeight))+window.innerHeight);

    self.posx = ((self.x-(window.innerWidth))*((self.x/(window.innerWidth-self.x))))
    self.posy = ((self.y-(window.innerHeight))*((self.y/(window.innerHeight-self.y))));
    //self.cdiv.style.transform = "translate("+(((self.x))*(self.x/window.innerWidth))+"px,"+((((self.y))*(self.y/window.innerHeight))-self.)+"px)";
    self.cdiv.style.transform = "translate("+self.posx+"px,"+self.posy+"px)";
    //console.log(document.getElementById("brain"));
    //self.brain.setAttribute("data-posx", posx);
    //self.brain.setAttribute("data-posy", posy);
	  //self.cdiv.style = self.style;
    //self.startY = self.y/2;
    self.x+=self.x*self.magx;
    self.y+=self.y*self.magy;
  };
  self.brainprocess();
  self.update();
  self.draw();

  
 
}
