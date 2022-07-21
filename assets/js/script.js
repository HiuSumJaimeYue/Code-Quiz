var mainEl = document.querySelector("#quiz-content");
var questionEl = document.querySelector("#title-question");
var guideEl = document.querySelector("#guide");
var startBtnEl = document.querySelector("#start-btn");

var optionEl = document.querySelector("#choice-list");
var optionCounter = 1;

//Create HashMap
var qAndA = ["Commonly used data types DO NOT Include:",
"The condition in an if/else statement is enclosed with ___."
];

var options = [["strings", "booleans", "alerts", "numbers"], 
["quotes", "curly brackets", "parenthesis", "square brackets"]
];

function changeQuestion(){
    console.log(questionEl);

    // set new question
    questionEl.textContent = qAndA[0];
    questionEl.setAttribute("style", "display: inline-block; text-align: left;");
    startBtnEl.style.display = 'none';
    guideEl.style.display = 'none';

    for (var i = 0; i < options[0].length; i++){
        var item = document.createElement("li");
        item.textContent = optionCounter + ". "+ options[0][i];
        item.setAttribute("id", optionCounter);
        optionEl.appendChild(item);
        optionCounter++;
        item.className = "btn-2";
    }
}

startBtnEl.addEventListener("click", changeQuestion);

