function signup(){

let user=document.getElementById("signupUser").value;
let pass=document.getElementById("signupPass").value;

let users=JSON.parse(localStorage.getItem("quizUsers")) || [];

if(users.find(u=>u.user===user)){
alert("User already exists");
return;
}

users.push({user,pass});

localStorage.setItem("quizUsers",JSON.stringify(users));

alert("Signup successful");

showLogin();
}

function login(){

let user=document.getElementById("loginUser").value;
let pass=document.getElementById("loginPass").value;

let users=JSON.parse(localStorage.getItem("quizUsers")) || [];

let valid=users.find(u=>u.user===user && u.pass===pass);

if(valid){

document.getElementById("loginBox").style.display="none";
document.getElementById("categoryBox").style.display="block";

}else{
alert("Invalid login");
}

}

function showSignup(){
document.getElementById("loginBox").style.display="none";
document.getElementById("signupBox").style.display="block";
}

function showLogin(){
document.getElementById("signupBox").style.display="none";
document.getElementById("loginBox").style.display="block";
}