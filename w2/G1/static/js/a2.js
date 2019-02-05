function buttonClicked(){
  alert(new Date());
}

var i = 0;
function hi(){
  console.log("hi: " + i++);
}

function showTime() {
  var h4 = document.getElementById("h4");
  h4.innerHTML = new Date();
}
console.log(i);
// var token = setTimeout(hi, 5*1000);
var token = setInterval(showTime, 1000);
var i = 0;
while(i < 5000){
  i++;
  console.log(i);
  if(i == 4000){
    clearInterval(token);
  }
}
