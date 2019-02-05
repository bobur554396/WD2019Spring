var box = document.querySelector(".box");

box.addEventListener('click', clicked);

function clicked(){
  alert("clicked");
}

document.onmousemove = function(e){
  box.style.display = "block";
  box.style.left = e.pageX + "px";
  box.style.top = e.pageY + "px";
}