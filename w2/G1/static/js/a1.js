var a = 2;
console.log(typeof(a));
a = "hello";
console.log(typeof (a));
a = true;
console.log(typeof (a));
a = {"hello": 1}
console.log(typeof (a));
a = null;
console.log(typeof (a));
a = undefined;
console.log(typeof (a));
a = function(){}
console.log(typeof (a));
// line comment

/*
multi line comment
*/

var b;
console.log(b);

a = 2;
b = 3;
console.log(a + b);
a *= b;
console.log(a);



console.log('2' == 2);
console.log(2 === 2);

// var;
// let;
// const;
var c;
function sum(a, b){
  console.log(a + b);
}
sum(2, 3);


for(let i = 0; i < 5; i++){
  if(i % 2 === 0)
    console.log(i);
}
// console.log(i);

var a = 2;
var b = function() {
  console.log("b function"); 
}



