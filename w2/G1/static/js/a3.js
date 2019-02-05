var box = document.getElementById("box");

function docMouseMove(e){
  console.log(e.pageX + ", " + e.pageY);
  box.style.left = e.pageX + "px";
  box.style.top = e.pageY + "px";
}


// document.onmousemove = docMouseMove;


// var button = document.getElementById("btn");
function buttonClicked(e){
  let btn = e.target;

  btn.style.color = '#000000';
  btn.style.background = '#ff0000';
}