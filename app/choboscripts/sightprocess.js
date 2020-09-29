var bod = document.getElementsByTagName("body")[0];
bod.style.background = "green";
var tagcounter = 0;
var attcounter = 0;
var classcounter = 0;
var icansee =false
let chobosys = {"doneseenit":"choboObject/doneseenit.js"
                }

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
    //console.log(elem);
    
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
          ////console.log(elem.attributes,elem);
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
          ////console.log(elem.attributes,elem);
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
    //var extractelem = new Doingwhat(obj);
    var elems = {};
    var elemsin = {};
    //extractelem.create()

    if(typeof obj === "object"){

      for(var [key,elem] of Object.entries(obj))
      {

        if(typeof elem != "object"){
          var name = this.getwhat(elem);
          var id = elem.getAttribute("id");
          var clas = elem.getAttribute("class");
          var data = elem.attributes;
          var dataencode = {};
          ////console.log(elem.getBoundingClientRect());
          for(var [keyi,value] of Object.entries(data)){
            
              var o = {"name":value.name,"value":value.value};
              dataencode[name] = o;
   
            
          }
          var innertext = elem.innerHTML;
          var encode = encodeURIComponent(innertext)
          elemsin[name] = {"name":name,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elem.getBoundingClientRect()};
       
        } 
        else{

          //console.log(elem)
          if(typeof elem === "object"){
            if(Object.keys(elem).length > 0){
              for(var [keyj,elemj] of Object.entries(elem)){
                //console.log(elemj);
                if(Object.keys(elemj).length > 0){
                  
                  if(elemj instanceof window.Element){
                 
                    var name = this.getwhat(elemj);
                     //console.log(elemj);
                    var id = elemj.getAttribute("id");
                    var clas = elemj.getAttribute("class");
                    var data = elemj.attributes;
                    var dataencode = {};
                    ////console.log(elem.getBoundingClientRect());
                    for(var [keyi,value] of Object.entries(data)){
                      
                        var o = {"name":value.name,"value":value.value};
                        dataencode[name] = o;
             
                      
                    }
                    var innertext = elemj.innerHTML;
                    var encode = encodeURIComponent(innertext);
                    elemsin[name] = {"name":name,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elemj.getBoundingClientRect()};
                  }
                }else{
                  //console.log(elemj);
                  if(elemj === window.Element){
                    var name = this.getwhat(elemj);
                    //console.log(elemj);
                    var id = elemj.getAttribute("id");
                    var clas = elemj.getAttribute("class");
                    var data = elemj.attributes;
                    var dataencode = {};
                    ////console.log(elem.getBoundingClientRect());
                    for(var [keyi,value] of Object.entries(data)){
                      
                        var o = {"name":value.name,"value":value.value};
                        dataencode[name] = o;
             
                      
                    }
                    var innertext = elemj.innerHTML;
                    var encode = encodeURIComponent(innertext);
                    elemsin[name] = {"name":name,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elemj.getBoundingClientRect()};
                  }
                }
              }
            }else{
              if(elem  instanceof window.Element){
                var name = this.getwhat(elem);
                 //console.log(elem);
                var id = elem.getAttribute("id");
                var clas = elem.getAttribute("class");
                var data = elem.attributes;
                var dataencode = {};
                ////console.log(elem.getBoundingClientRect());
                for(var [keyi,value] of Object.entries(data)){
                  
                    var o = {"name":value.name,"value":value.value};
                    dataencode[name] = o;
         
                  
                }
                var innertext = elem.innerHTML;
                var encode = encodeURIComponent(innertext);
                elemsin[name] = {"name":name,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elem.getBoundingClientRect()};
              };
            };
          }; 
        };
        elems[key] = elemsin; 

        // else
        //   elems[key] = {"name":key,"id":id,"class":clas,"data":dataencode,"textcontent":encode, "clientrect":elem.getBoundingClientRect()};
        // //elems[name] = {"id":elem}
      }
    }
    ////console.log(elems);
    return elems;
  }

  
}

var Seeing = function(){
	var self= this;
	self.cdiv = document.getElementById("chobochar");
  self.helper = new Helper();
  self.seen =[];
  self.maxX = {};
  self.minX = {};
  self.maxY = {};
  self.minY = {};
  self.xcoordmax ={};
  self.xcoordmin = {};
  self.ycoordmin = {};
  self.ycoordmax = {};
  self.objatcoord= {};
  self.phatoms = {};
	self.see = function(){
    self.cdiv = document.getElementById("chobochar");
    var bod = document.querySelector("body");
    var x = self.x-bod.getClientRects()[0].right;
    var y = self.y-bod.getClientRects()[0].height;
   
    //var event = new Event('change',{"bubbles":true ,"cancelable":false});

    //////console.log(self.cdiv.getBoundingClientRect().y);
    ////console.log(bod);
    var arr = []
    var arrG = [];
    var arrtwo = [];
    var outarr = [];


    //////console.log(sriptsaa);
    //bod.appendChild(self.sriptsaa[0]);
    //console.log(bod);
    function grandchild(par){
      var innerarr = [];
      //////console.log(par)
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
    //                     ////console.log(elem.childElementCount,elem,"i"+i);
    //                     arr.push(elem);
    //                     innerchild(elem.children);
                       
    //                   }else{
    //                     arr.push(elem);
    //                     var p = innerchild(elem.children)
    //                     var child = grandchild(elem.children);
    //                     ////console.log(p,child);
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
      bod.getElementsByTagName("body")[0];
      if(child ===  undefined){
        child = bod.children;
      }else if(child.length < 0){
        child = bod.children;
      }else{
        child = child;
      }
      ////console.log(child);
      for(var [i,elem] of Object.entries(child)){

        if(elem.nodeName != "META" || elem.tagName != "META"){ 
          if(elem.nodeName != "STYLE" || elem.tagName != "STYLE"){ 
            if(elem.nodeName != "LINK" || elem.tagName != "LINK"){ 
             if(elem.nodeName != "SCRIPT" || elem.tagName != "SCRIPT"){
              if(elem.nodeName != "IFRAME" || elem.tagName != "IFRAME"){
                if(elem.nodeName != "B" || elem.tagName != "B"){

              
                  if(elem.nodeType != 3){
                    if(elem.childElementCount >0){
                      //////console.log(elem.childElementCount,elem,"i"+i);
                      arr.push(elem);
                      arr = innerchild(elem.children);
                      
                    }else{
                      arr.push(elem);
                      //////console.log(elem.childElementCount,elem,"i"+i);

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
                                      //////console.log(elemj.childElementCount,elemj,"j"+j);
                                      g = grandchild(elemj.children);
                                      //countj++;
                                      ////console.log(g);
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
    var len = arrtwo.length;
    //console.log(arrtwo);
    //var json = JSON.stringify(self.helper.stringify(arrtwo));

    ////console.log(arrtwo);
    var s = setInterval(async () =>{

      
      //console.log(arrtwo);
      //outarr = innerchild(arrtwo);
      var out = setTimeout(async ()=>{
      //var event = new CustomEvent('seenit');
        //outarr.dispatchEvent(event);
      //   setTimeout(async ()=>{
      // // var event = new CustomEvent('seenit');
            
      //       try{
              
              
      //         //bod.removeChild(self.sriptsaa[0]);
      //         //bod.appendChild(self.sriptsaa[0]);
      //       }catch(e){

      //       }
            
      //       clearTimeout(this);


      //   },1700);
        clearInterval(s);

        self.seen = arrtwo;
        //console.log(self.seen);
      },1500);
    },1000);

    
    return arrtwo;  
  }
  self.setseenit = function(list){
    self.seen = list;
  }

  self.seenit = function(){
    console.log(self.seen);
    return self.seen;
  }
  self.check = false;
  self.perspective = function(){
    
    
    var x = self.cdiv.getClientRects()[0].x;
    var y = self.cdiv.getClientRects()[0].y;
    var outx = {};
    var outy = {};
    var ox = 0;
    var oy = 0;

    if(!self.check){
      //console.log(self.cdiv);
      //console.log("kjhskjdhlasd",self.awareness());
      self.check = true;
    }
    
    console.log(self.sightprocess());
      for(var [key,elem] of Object.entries(self.sightprocess())){
        //////console.log(key, elem["x"]);
        ox = Object.entries(elem["x"]);
        oy = Object.entries(elem["y"]);

        var xx = Object.keys(elem["x"]);
        var yy = Object.keys(elem["y"]);
        // //console.log(x,ox,xx);

        //console.log(yy);

        if(x > parseFloat(xx)){
          ////console.log(x,ox[0][0],ox);
          var xs = Object.keys(elem["x"]);
          self.minX[key] = elem["x"][xs[0]]["elem"]
          self.xcoordmax[key] = xs[0];

        }

        if(x < parseFloat(xx)){
           ////console.log(x,ox[0][1],xx);
          var xs = Object.keys(elem["x"]);
          // //console.log(xs,elem["x"][xs[0]]);
          self.maxX[key] = elem["x"][xs[0]]["elem"]
          self.xcoordmin[key] = xs[0];

        }

        if(y > parseFloat(yy)){
           //////console.log(y,oy);
          self.minY[key] = oy[0][1]["elem"];
          self.ycoordmin[key] = oy[0][0]; 


        }

        if(y < parseFloat(yy)){
           //////console.log(y,oy);
          self.maxY[key] = oy[0][1]["elem"];
          self.ycoordmax[key] = oy[0][0]; 

        }
        
      }
      self.coord = {"top":self.ycoordmin,"bottom":self.ycoordmax, "left":self.xcoordmin,"right":self.xcoordmax};
      self.objatcoord = {"top":self.minX,"bottom":self.minX, "left":self.minY,"right":self.minX};

    // self.ycoord = coordy;

    return self.objatcoord;
  }
  self.out = {}; 
  self.sightprocess = function(){
    
    try{
     //bod.removeChild(self.sriptsaa[0]);
    }catch(e){

    }
    var out = {};
    // try{
    //   bod.removeChild(self.sriptsaa[1]);
    // }catch(e){

    // }
    if(self.seenit() != undefined){
      if(self.seenit().length != 0){
        ////console.log(self.seenit());
        for(var i of self.seenit()){
          var name = self.helper.getwhat(i);
          out[name] = self.helper.getByCoords(i,self.helper.getwhat(i));
        }
      }
    }

    return out;
    // console.log(self.awareness());
    // if(self.awareness() != "nothing to see"){
    //   //console.log(self.seenit())
    //   if(self.seenit().length != 0){
    //     //console.log(self.seenit());
    //     for(var i of self.seenit()){
    //       var name = self.helper.getwhat(i);
    //       self.out[name] = self.helper.getByCoords(i,self.helper.getwhat(i));
    //     }
    //   }
    // }
    // else{
    //   self.out = "nothing to see"
    // }
    // return self.out;
  }
  self.sight = function(elemX,elemY){
    var x = self.cdiv.getClientRects()[0].x;
    var y = self.cdiv.getClientRects()[0].y;
    var sight = 0;
    //////console.log(elemX,elemY);

    if(elemX != undefined && elemY != undefined){
      if(!isNaN(elemX) && !isNaN(elemY)){
        sight = Math.pow((x-elemX),2)+Math.pow((y-elemY),2);
        //////console.log(sight);
      }
    }

    return sight;
  }
  self.top = [];
  self.bottom = [];
  self.left = [];
  self.right = [];
  self.seephantoms = function(list){

    var aware;

    if(list != undefined){
      aware = list;
      console.log(aware);
    }else{
      aware = self.perspective();
    }
    var pass = {};
    var out = {};
    var b = {};
    // var top = [];
    // var bottom = [];
    // var left = [];
    // var right = [];
    var styles = {};
    var stylestop = {};
    var stylesbottom = {};
    var stylesleft = {};
    var stylesright = {};
    

    console.log(aware);
    if(aware != "nothing to see here"){
      if(Object.entries(aware).length > 0){
        for(var [key,elem] of Object.entries(aware)){
          console.log(elem,Object.keys(elem));
          // var h = elem[Object.keys(elem)].getBoundingClientRect().height;
          // var w = elem[Object.keys(elem)].getBoundingClientRect().width;
          // if(h == 0 || w == 0){
              
          //     self.phatoms[key] = elem;
          //     ////console.log(elemj);
          //     // delete key;
          //     // delete elem;
          // }else{ 
          //   out[key] = elem;
          // }
      //     b[key] = {};
      //     styles[key] = {};
      //     ///console.log(elem);

      //     for(var [keyj,elemj] of Object.entries(elem)){
            
      //       if(elemj.tagName != null){

      //       }
      //       //console.log(keyj,elemj);
      //       h = elemj.getBoundingClientRect().height;
      //       w = elemj.getBoundingClientRect().width;
            
      //       if(h == 0 || w == 0){
              
      //         self.phatoms[keyj] = elemj;
      //         //console.log(elemj);
      //         // delete keyj;
      //         // delete elemj;
      //       }else{
      //         console.log(key,keyj,elemj);
              
      //         if(key === "top"){
      //           self.top.push(elemj);
      //            stylestop[keyj] = window.getComputedStyle(elemj);
      //         }if(key === "bottom"){
      //           self.bottom.push(elemj);
      //           stylesbottom[keyj] = window.getComputedStyle(elemj);
      //         }if(key === "left"){
      //           self.left.push(elemj);
      //           stylesleft[keyj] = window.getComputedStyle(elemj);
      //         }if(key === "right"){
      //           self.right.push(elemj);
      //           stylesright[keyj] = window.getComputedStyle(elemj);
      //         }
      //         // b[keyj] = elemj;
      //         // pass[key] = {keyj,b};  
            
      //         //out[key] = b;
      //         //out[key][keyj] = elemj;
      //       }
      //       //if(styles[keyj]["background"] != undefined)
      //         //console.log(styles[keyj]["background"],elemj);

      //       //console.log(keyj,elemj.getBoundingClientRect().height,elemj);
      //     }
      //     console.log(self.top,self.bottom);
      //      if(key === "top"){
      //       Object.assign(b[key],self.top);
      //       Object.assign(styles[key],stylestop);
      //     }if(key === "bottom"){
      //      Object.assign(b[key],self.bottom);
      //      Object.assign(styles[key],stylesbottom);
      //     }if(key === "left"){
      //       Object.assign(b[key],self.left)
      //       Object.assign(styles[key],stylesleft);
      //     }if(key === "right"){
      //      Object.assign(b[key],self.right);
      //      Object.assign(styles[key],stylesright);
      //     }
            
      //     ////console.log(elem);

      //   }

      //  //aware = elem;

      
      // }    
      
      // //console.log(styles);
      // if(Object.entries(aware).length > 0){
      //   for(var [key,elem] of Object.entries(aware)){
          
      //     for(var [keyj,elemj] of Object.entries(elem)){
      //       if(styles[key][keyj] != undefined){
      //        if(styles[key][keyj]["display"] === "none");{
      //         self.phatoms[keyj] = elemj;
      //         delete self.phatoms[keyj];
      //        }
      //        if(styles[key][keyj]["visiblity"] === "none");{
      //         self.phatoms[keyj] = elemj;
      //         delete self.phatoms[keyj];
      //        }
      //       }
            
      //     }
          
      //   }
      // }
      // ////console.log(styles)
      // //pass = {"top":}
      // ////console.log(self.phatoms);
      // // for(var[i,elem] of Object.entries(out)){
       
      // //     //console.log(i,elem.style.getPropertyValue("text-align"));
      // // }
      // var json = JSON.stringify(self.helper.stringify(b));
      // console.log(self.helper.stringify(b),json);

      // console.log(aware,out,b);
    }else{
      console.log("nothing to see");
    }
    return b
  }
  self.awareness = function(){
    
    if(Object.entries(self.perspective()).length > 0)
      return self.perspective();
    else
      return "nothing to see";
  }  

}
var seeing = new Seeing();
var sightretainer = document.querySelectorAll(".sightretainer");
var getinfo;

sightretainer[0].addEventListener('seenit',function(e){
  getinfo = seeing.see();
  //console.log(sightretainer[0]);
  seeing.setseenit(getinfo);
  icansee = true;
  //console.log("here",getinfo);
   var seeingit = seeing.seephantoms();

   console.log(icansee);
    while(getinfo == undefined){
      console.log(icansee);
      seeingit = seeing.seephantoms();
      console.log(getinfo);
      if(getinfo != undefined){
        break;
      }
    }
    console.log(seeingit);
    // var seeingit = seeing.seephantoms();
});