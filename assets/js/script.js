var headerEl = document.querySelector("#header");
var mainEl = document.querySelector("#quiz");
var frontPageEl = document.querySelector("#front-page");
var titleEl = document.querySelector("#title-question");
var questionEl = document.querySelector("#question");
var guideEl = document.querySelector("#guide");
var startBtnEl = document.querySelector("#start-btn");
var viewHSbtnEl = document.querySelector("#viewHSbtn");

var questionPageEl = document.querySelector("#question-page");
var optionEl = document.querySelector("#choice-list");
var decisionEl = document.querySelector("#decision");

var donePageEl = document.querySelector("#done-page");
var doneEl = document.querySelector("#done");
var finalScoreEl = document.querySelector("#final-score");
var endEl = document.querySelector("#form-container");
var nameFormEl = document.querySelector("#name-form");
var nameInputEl = document.querySelector("#name");

//highscores
var highscoreEl = document.querySelector("#highscores");
var hsRankingsEl = document.querySelector("#rankings");
var clearHSbtnEl = document.querySelector("#clear-hs-btn");

//Create counter for questions
var currentQuestionNum = 0;

//ranking list
var rankingList = [];

//Create HashMap
var question = ["Commonly used data types DO NOT Include:",
    "The condition in an if/else statement is enclosed with ___.",
    "Arrays in Javascript can be used to store ___.",
    "String values must be enclosed within ___ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is: "
];

//need to change to array of strings
var answer = ["alerts", "parenthesis", "all of the above", "quotes", "console.log"];

var options = [["strings", "booleans", "alerts", "numbers"],
["quotes", "curly brackets", "parenthesis", "square brackets"],
["numbers and strings", "other arrays", "booleans", "all of the above"],
["commas", "curly brackets", "quotes", "parenthesis"],
["JavaScript", "terminal / bash", "for loops", "console.log"]
];

function beginQuestion() {
    changeQuestion(0);
    mainEl.className = "quiz-content-2";
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
    questionEl.setAttribute("style",
        "display: inline-block; text-align: left;" +
        "width: 450px;");
    titleEl.style.display = 'none';
    startBtnEl.style.display = 'none';
    guideEl.style.display = 'none';
    optionEl.innerHTML = "";

    //Create Counter for options
    var optionCounter = 1;

    for (var i = 0; i < content.options.length; i++) {
        var item = document.createElement("li");
        item.textContent = optionCounter + ". " + content.options[i];
        optionEl.appendChild(item);
        optionCounter++;
        item.className = "options";
        item.addEventListener("click", decisionAndNext);
    }
}

function decisionAndNext() {
    var n = 3;
    str = this.textContent.slice(n);//cut off first 3
    decisionEl.style.display = 'flex';
    if (str === answer[currentQuestionNum]) {
        decisionEl.textContent = "Correct!";
    }
    else {
        decisionEl.textContent = "Wrong!";
        //MINUS TIME -10
    }
    setTimeout(() => {
        //removes element from DOM
        decisionEl.style.display = 'none';
        currentQuestionNum++;

        if (currentQuestionNum > question.length - 1) {
            doneQuestions();
        } else {
            //Go to the next question
            changeQuestion(currentQuestionNum)
        }
    }, 200); //time in milliseconds

}

//Timer control
// setInterval(myTimer, 1000);
// setInterval(addTime, 1000);
var time = 0;
// function myTimer() {
//   	document.getElementById("demo").innerHTML = time;

// }
// function addTime(){
// 	time++;
// }

//Ran out off time, cannot finish the quiz
function doneQuestions() {

    doneEl.textContent = "All done!";
    questionEl.innerHTML = "";
    optionEl.innerHTML = "";
    finalScoreEl.style.display = 'block';
    //save time -> score before clearing


    finalScoreEl.textContent = "Your final score is " + time + ".";
    endEl.style.display = 'flex';
}

//get value from input element
function formSubmit(event) {
    event.preventDefault();
    // console.log(event);
    var nameInput = nameInputEl.value.trim();
    var timescore = 45;
    if (!nameInput) {
        nameInput = "No name";
    }

    var recordObj = {
        name: nameInput,
        score: timescore
    };
    console.log(rankingList);
    rankingList.push(recordObj);

    //sort by highest to lowest score
    rankingList.sort(function(a, b){return b.score - a.score});

    //save into localStorage
    localStorage.setItem("Highscores", JSON.stringify(rankingList));
    showHighscores();
}

function showHighscores() {
    //clear out everything
    headerEl.style.display = 'none';
    frontPageEl.style.display = 'none';
    questionPageEl.style.display = 'none';
    donePageEl.style.display = 'none';

    highscoreEl.style.display = 'flex';

    //need to compare score before

    //Get saved high scores
    var savedhighscores = localStorage.getItem("Highscores");
    console.log(savedhighscores);
    // if there are no records, return
    if (!savedhighscores) {
        hsRankingsEl.innerHTML = "";
        clearHSbtnEl.disabled = true;
        var noRecords = document.createElement("p");
        noRecords.textContent = "No high scores recorded";
        noRecords.className = "hs-ranking-none";
        hsRankingsEl.appendChild(noRecords);
        return false;
    }
    // parse into array of objects
    var parsedHighscores = JSON.parse(savedhighscores);

    console.log(rankingList);
    console.log(parsedHighscores);
    console.log(rankingList.length);
    console.log(parsedHighscores.length);
    for (var i = 0; i < parsedHighscores.length; i++) {
        var item = document.createElement("li");
        var name = parsedHighscores[i].name;
        var score = parsedHighscores[i].score;
        item.textContent = name + " ----- " + score;
        if (i % 2 === 0) {
            item.className = "hs-ranking-odd";
        }
        hsRankingsEl.appendChild(item);
    }

}

function loadHighscores(event) {
    console.log(rankingList);
    var savedhighscores = localStorage.getItem("Highscores");
    console.log(savedhighscores);
    // if there are no records, return
    if (!savedhighscores) {
        return false;
    }
    // parse into array of objects
    var parsedHighscores = JSON.parse(savedhighscores);

    for (var i = 0; i < parsedHighscores.length; i++) {
        console.log(parsedHighscores[i]);
        rankingList.push(parsedHighscores[i]);

    }
    console.log(rankingList);
}

function clearHighscores() {
    rankingList = [];
    localStorage.removeItem("Highscores");
    clearHSbtnEl.disabled = true;
    showHighscores();
}

startBtnEl.addEventListener("click", beginQuestion);
nameFormEl.addEventListener("submit", formSubmit);
viewHSbtnEl.addEventListener("click", showHighscores);
clearHSbtnEl.addEventListener("click", clearHighscores);

loadHighscores();