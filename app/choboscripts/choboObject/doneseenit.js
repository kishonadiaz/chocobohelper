var docw = document.querySelectorAll(".sightretainer");
var eventw = new Event("seenit",{"bubbles":true});
try{
docw[0].dispatchEvent(eventw);
}finally{

}
//window.testing.setAttruibe("data-mover","new data");
docw[0].setAttribute("data-mover","seen");

docw[0].innerHTML = "I SEE YOU ALL";
