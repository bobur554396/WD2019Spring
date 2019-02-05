console.log("hello");
var name = prompt("Enter your name:");
console.log(`your name: ${name}`);
// alert(`Hello ${name}`);

var greeting = document.getElementById("greeting");
greeting.innerHTML = `Hello ${name}`;
