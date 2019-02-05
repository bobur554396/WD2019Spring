var time = document.querySelector(".time");
console.log(time);

var token;
function showAlert(){
  alert("hi");
  clearTimeout(token);
}

function btnClicked(){
  token = setTimeout(showAlert, 3*1000);
}

function showTime(){
  time.innerHTML = new Date();
}

// token = setInterval(showTime, 1000);


