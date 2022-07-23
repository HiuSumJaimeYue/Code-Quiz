var mainEl = document.querySelector("#quiz-content");
var questionEl = document.querySelector("#title-question");
var guideEl = document.querySelector("#guide");
var startBtnEl = document.querySelector("#start-btn");
var optionEl = document.querySelector("#choice-list");
var decisionEl = document.querySelector("#decision");

//Create counter for questions
var currentQuestionNum = 0;

//Create HashMap
var question = ["Commonly used data types DO NOT Include:",
    "The condition in an if/else statement is enclosed with ___."]
    ;
//need to change to array of strings
var answer = ["strings", "quotes"];

var options = [["strings", "booleans", "alerts", "numbers"],
["quotes", "curly brackets", "parenthesis", "square brackets"]
];

function beginQuestion(){
    changeQuestion(0);
}

function changeQuestion(questionNum) {
    //Setup object
    var content = {
        question: question[questionNum],
        options: options[questionNum],
        answer: answer[questionNum]
    };

    // set new question
    questionEl.textContent = content.question;
    questionEl.setAttribute("style", "display: inline-block; text-align: left;");
    startBtnEl.style.display = 'none';
    guideEl.style.display = 'none';
    optionEl.innerHTML = "";

    //Create Counter for options
    var optionCounter = 1;

    for (var i = 0; i < content.options.length; i++) {
        var item = document.createElement("li");
        item.textContent = optionCounter + ". " + content.options[i];
        item.setAttribute("id", optionCounter);
        optionEl.appendChild(item);
        optionCounter++;
        item.className = "btn-2";
        item.addEventListener("click", decisionAndNext);
    }
}

function decisionAndNext() {
    var n = 3;
    str = this.textContent.slice(n);//cut off first 3
    decisionEl.style.display = 'block';
    if (str === answer[currentQuestionNum]) {
        decisionEl.textContent = "Correct!";
    }
    else {
        decisionEl.textContent = "Wrong!";
    }
    setTimeout(() => {
        //removes element from DOM
        decisionEl.style.display = 'none';
        currentQuestionNum++;
        //Go to the next question
        changeQuestion(currentQuestionNum)
    }, 1000); //time in milliseconds
}

startBtnEl.addEventListener("click", beginQuestion);
