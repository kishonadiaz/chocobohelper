var doc = document.querySelectorAll(".datamoving");
var event = new Event("datachange",{"bubbles":true});

doc[0].dispatchEvent(event);
//window.testing.setAttruibe("data-mover","new data");
doc[0].setAttribute("data-mover","new data");

doc[0].innerHTML = "AHHHHHHHHHHHHHHHHHHHHHHHHHHHH";

console.log(doc);