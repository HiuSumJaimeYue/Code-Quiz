//Starting Page
var headerEl = document.querySelector("#header");
var timerEl = document.querySelector("#timer");
var mainEl = document.querySelector("#quiz");
var frontPageEl = document.querySelector("#front-page");
var titleEl = document.querySelector("#title");
var guideEl = document.querySelector("#guide");
var startBtnEl = document.querySelector("#start-btn");
var viewHSbtnEl = document.querySelector("#viewHSbtn");

//Question Page
var questionPageEl = document.querySelector("#question-page");
var questionEl = document.querySelector("#question");
var optionEl = document.querySelector("#choice-list");
var decisionEl = document.querySelector("#decision");

//Done/Finish Page
var donePageEl = document.querySelector("#done-page");
var doneEl = document.querySelector("#done");
var finalScoreEl = document.querySelector("#final-score");
var endEl = document.querySelector("#form-container");
var nameFormEl = document.querySelector("#name-form");
var nameInputEl = document.querySelector("#name");

//Highscores Page
var highscoreEl = document.querySelector("#highscores");
var hsRankingsEl = document.querySelector("#rankings");
var clearHSbtnEl = document.querySelector("#clear-hs-btn");

//Create counter for questions
var currentQuestionNum = 0;

//ranking list
var rankingList = [];

//Questions contents
var question = ["Commonly used data types DO NOT Include:",
    "The condition in an if/else statement is enclosed with ___.",
    "Arrays in Javascript can be used to store ___.",
    "String values must be enclosed within ___ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is: "
];

var answer = ["alerts", "parenthesis", "all of the above", "quotes", "console.log"];

var options = [["strings", "booleans", "alerts", "numbers"],
["quotes", "curly brackets", "parenthesis", "square brackets"],
["numbers and strings", "other arrays", "booleans", "all of the above"],
["commas", "curly brackets", "quotes", "parenthesis"],
["JavaScript", "terminal / bash", "for loops", "console.log"]
];

//Timer control
var time = 76; // it will not show 76 but start at 75
var timerControl;

function minusTime() {
    if (time < 1) {
        //so no one will get a score less than 0
        // even if getting multiple questions wrong
        time = 0;
        doneQuestions();
    } else {
        time--;
    }
    timerEl.textContent = "Time: " + time;
}

//Question Page
function beginQuestion() {
    changeQuestion(0);
    mainEl.className = "quiz-content-2";
    timerControl = setInterval(minusTime, 1000);
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
        //Answered wrong time - 10
        time = time - 10;
    }
    //keep the elements there for the participants 
    //to see if they are right or wrong
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
    }, 300); //time in milliseconds

}

//Done/Finish Page
//Ran out off time, cannot finish the quiz
//Or finished quiz
function doneQuestions() {
    //stop the timer
    clearTimeout(timerControl);

    //Clear out questions and options
    questionPageEl.style.display = 'none';

    //so no one will get a score less than 0
    // even if getting multiple questions wrong
    if (time < 1) {
        time = 0;
    }

    //just to make sure the time and score shows up the same
    timerEl.textContent = "Time: " + time;

    //the timer ends before finishing the quiz
    if (currentQuestionNum != question.length && time < 1) {
        doneEl.textContent = "All done! Time is up!";
    }
    else {
        doneEl.textContent = "All done!";
    }

    finalScoreEl.style.display = 'block';
    finalScoreEl.textContent = "Your final score is " + time + ".";
    endEl.style.display = 'flex';
}

//get value from input element for high scores
function formSubmit(event) {
    event.preventDefault();

    var nameInput = nameInputEl.value.trim();
    var timescore = time;
    if (!nameInput) {
        nameInput = "No name";
    }

    var recordObj = {
        name: nameInput,
        score: timescore
    };

    rankingList.push(recordObj);

    //sort by highest to lowest score before saved into localStorage
    rankingList.sort(function (a, b) { return b.score - a.score });

    //save into localStorage
    localStorage.setItem("Highscores", JSON.stringify(rankingList));
    showHighscores();
}

//Highscores Page
function showHighscores() {
    //clear out everything
    headerEl.style.display = 'none';
    frontPageEl.style.display = 'none';
    questionPageEl.style.display = 'none';
    donePageEl.style.display = 'none';

    highscoreEl.style.display = 'flex';

    //Get saved high scores
    var savedhighscores = localStorage.getItem("Highscores");

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
    var savedhighscores = localStorage.getItem("Highscores");

    // if there are no records, return
    if (!savedhighscores) {
        return false;
    }
    // parse into array of objects
    var parsedHighscores = JSON.parse(savedhighscores);

    for (var i = 0; i < parsedHighscores.length; i++) {
        rankingList.push(parsedHighscores[i]);

    }
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