let currentUser = null
let currentQuiz = []
let currentQuestionIndex = 0
let score = 0
let selectedAnswer = null

// QUIZ DATA

const quizzes = {

html:[
{
type:"mcq",
question:"What does HTML stand for?",
options:["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup"],
answer:"Hyper Text Markup Language"
},

{
type:"truefalse",
question:"HTML is used to structure web pages.",
answer:"True"
},

{
type:"fill",
question:"HTML tag for largest heading?",
answer:"h1"
}
],

css:[
{
type:"mcq",
question:"Which property changes text color?",
options:["font-color","color","text-color"],
answer:"color"
},

{
type:"truefalse",
question:"CSS stands for Cascading Style Sheets.",
answer:"True"
},

{
type:"fill",
question:"Property used for background color?",
answer:"background-color"
}
],

js:[
{
type:"mcq",
question:"Which keyword declares variable?",
options:["var","int","string"],
answer:"var"
},

{
type:"truefalse",
question:"JavaScript runs in browser.",
answer:"True"
},

{
type:"fill",
question:"Method to print console message?",
answer:"console.log"
}

]

}


// AUTHENTICATION

function signup(){

let user=document.getElementById("signupUser").value
let pass=document.getElementById("signupPass").value

localStorage.setItem(user,pass)

alert("Account Created")

showLogin()

}

function login(){

let user=document.getElementById("loginUser").value
let pass=document.getElementById("loginPass").value

let stored=localStorage.getItem(user)

if(stored===pass){

currentUser=user

document.getElementById("authBox").classList.add("hidden")
document.getElementById("quizBox").classList.remove("hidden")

document.getElementById("welcomeUser").innerText="Welcome "+user

}else{
alert("Invalid Login")
}

}

function logout(){
location.reload()
}

function showSignup(){
document.getElementById("loginBox").classList.add("hidden")
document.getElementById("signupBox").classList.remove("hidden")
}

function showLogin(){
document.getElementById("signupBox").classList.add("hidden")
document.getElementById("loginBox").classList.remove("hidden")
}



// START QUIZ

function startQuiz(type){

currentQuiz=quizzes[type]

currentQuestionIndex=0
score=0

document.getElementById("quizArea").classList.remove("hidden")

loadQuestion()

}



// LOAD QUESTION

function loadQuestion(){

selectedAnswer=null

let q=currentQuiz[currentQuestionIndex]

document.getElementById("question").innerText=q.question

let optionsDiv=document.getElementById("options")
optionsDiv.innerHTML=""

document.getElementById("textAnswer").classList.add("hidden")

if(q.type==="mcq"){

q.options.forEach(opt=>{

let btn=document.createElement("div")
btn.className="option"
btn.innerText=opt

btn.onclick=()=>{

selectedAnswer=opt

document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"))

btn.classList.add("selected")

}

optionsDiv.appendChild(btn)

})

}

else if(q.type==="truefalse"){

["True","False"].forEach(opt=>{

let btn=document.createElement("div")
btn.className="option"
btn.innerText=opt

btn.onclick=()=>{

selectedAnswer=opt

document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"))

btn.classList.add("selected")

}

optionsDiv.appendChild(btn)

})

}

else if(q.type==="fill"){

document.getElementById("textAnswer").classList.remove("hidden")

}

}



// SUBMIT ANSWER

function submitAnswer(){

let q=currentQuiz[currentQuestionIndex]

if(q.type==="fill"){
selectedAnswer=document.getElementById("textAnswer").value
}

if(selectedAnswer==null){
alert("Select answer")
return
}

if(selectedAnswer.toLowerCase()==q.answer.toLowerCase()){

score++

document.getElementById("feedback").innerText="✅ Correct"

}else{

document.getElementById("feedback").innerText="❌ Wrong! Correct: "+q.answer

}

document.getElementById("nextBtn").classList.remove("hidden")

}



// NEXT QUESTION

function nextQuestion(){

currentQuestionIndex++

document.getElementById("feedback").innerText=""
document.getElementById("nextBtn").classList.add("hidden")
document.getElementById("textAnswer").value=""

if(currentQuestionIndex<currentQuiz.length){

loadQuestion()

}else{

document.getElementById("quizArea").innerHTML=
`<h2>Quiz Finished 🎉</h2>
<p>Your Score: ${score}/${currentQuiz.length}</p>
<button onclick="location.reload()">Play Again</button>`

}

}