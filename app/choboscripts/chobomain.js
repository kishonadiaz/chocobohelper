var htm = document.querySelector('html');
var b = document.querySelector('body');
var cdiv = document.createElement('img'); 
var k,rn;
var doitonce = false;
// console.log(window);
var startx = 20;
var starty = (-window.innerHeight*.57);
var chobochar = new ChoboCharacter(startx,starty,300,300);
//chobochar.startingPos(20,(window.innerHeight-chobochar.height)-20);
// chobochar.update();
const asyncIntervals = [];

const runAsyncInterval = async (cb, interval, intervalIndex) => {
  await cb();
  if (asyncIntervals[intervalIndex]) {
    setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval);
  }
};

const setAsyncInterval = (cb, interval) => {
  if (cb && typeof cb === "function") {
    const intervalIndex = asyncIntervals.length;
    asyncIntervals.push(true);
    runAsyncInterval(cb, interval, intervalIndex);
    return intervalIndex;
  } else {
    throw new Error('Callback must be a function');
  }
};

const clearAsyncInterval = (intervalIndex) => {
  if (asyncIntervals[intervalIndex]) {
    asyncIntervals[intervalIndex] = false;
  }
};



console.log(document.querySelectorAll("body"));

var x =chobochar.x;
var y = chobochar.y;
var datamoving = document.querySelectorAll(".datamoving");
var sightretainer = document.querySelectorAll(".sightretainer");
htm.insertBefore(chobochar.getCdiv(),b);
chobochar.see();
// var seeit = document.querySelector("#seeing");
//   console.log(seeit);
//   seeit.addEventListener('toogle',function(e){
//     //console.log(e.value);
//     console.log(chobochar.seenit());
//   })
datamoving[0].addEventListener("datachange",function(e){
  console.log("ok");

})
sightretainer[0].addEventListener('seenit',function(e){
  console.log("isds");
  // console.log(chobochar.seenit());
  console.log(chobochar.direction());
  //console.log(chobochar.awarenessbyval());
})
chobochar.setSpeed((0.9));
try{
  setAsyncInterval(async () => {
  	//console.log(chobochar.x,chobochar.y);
    var s = this;
    chobochar.move(x,y,0,0);
    chobochar.update();
    // if(datamoving[0].getAttribute("data-mover") === "new data"){
    //   datamoving[0].innerHTML = "YES";
    // }
    // const promise = new Promise((resolve) => {
    //   setTimeout(resolve('all done'), 1000);
    // });
    setTimeout(async ()=>{
      clearInterval(s);
    },1000);

    // x+=((1*chobochar.magx)+(chobochar.getSpeedx()));
    // y+=((1*chobochar.magy)+(chobochar.getSpeedy()));

    x+=((chobochar.getSpeedx()*chobochar.magx));
    y+=((chobochar.getSpeedy()*chobochar.magy));

    // await promise;
    chobochar.startX = x;
    chobochar.startY = y;
  }, 10);
}catch(e){

}

chocoWebNetwork.sendMessage("chobowmain","test there");
