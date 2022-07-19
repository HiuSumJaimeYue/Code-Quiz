var mainEl = document.querySelector("#quiz-content");
var questionEl = document.querySelector("#title-question");
var guideEl = document.querySelector("#guide");
var startBtnEl = document.querySelector("#start-btn");

var questions = ["Commonly used data types DO NOT Include:"];

function changeQuestion(){
    console.log(questionEl);

    // set new question
    questionEl.textContent = questions[0];
    startBtnEl.style.display = 'none';
    guideEl.style.display = 'none';

    
    
}

startBtnEl.addEventListener("click", changeQuestion);

