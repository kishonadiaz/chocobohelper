var htm = document.querySelector('html');
var b = document.querySelector('body');
var cdiv = document.createElement('img'); 
var k,rn;
var doitonce = false;
console.log(window);
var chobochar = new ChoboCharacter(20,300,300,300);
//chobochar.startingPos(20,(window.innerHeight-chobochar.height)-20);
// chobochar.update();
console.log(window.innerHeight);
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


var x =chobochar.x;
var y = chobochar.y;
htm.insertBefore(chobochar.getCdiv(),b);
setAsyncInterval(async () => {
	console.log(chobochar.x,chobochar.y);
  chobochar.move(x,y,1,1);
  chobochar.update();
  const promise = new Promise((resolve) => {
    setTimeout(resolve('all done'), 1000);
  });
  x+=1.01;
  y+=1.01;
  chobochar.startX += x;
  chobochar.startY += y;
  await promise;

}, 10);


chocoWebNetwork.sendMessage("chobowmain","test there");
