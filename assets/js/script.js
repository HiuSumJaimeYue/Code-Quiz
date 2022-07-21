var mainEl = document.querySelector("#quiz-content");
var questionEl = document.querySelector("#title-question");
var guideEl = document.querySelector("#guide");
var startBtnEl = document.querySelector("#start-btn");

var optionEl = document.querySelector("#choice-list");
var optionCounter = 0;

// var favoriteEl = document.createElement("div");
// Create ordered list element
// var listEl = document.createElement("ol");

var questions = ["Commonly used data types DO NOT Include:"];

var favoriteFood = ["1","2","3","4a"];
// favoriteEl.textContent = "My favorite foods are:";
// var colours = ["yellow", "pink", "blue","green"];

function changeQuestion(){
    console.log(questionEl);

    // set new question
    questionEl.textContent = questions[0];
    questionEl.setAttribute("style", "display: inline-block; text-align: left;");
    startBtnEl.style.display = 'none';
    guideEl.style.display = 'none';

        // var item = document.createElement("li");
        // newText = document.createTextNode('txt');
        // item.appendChild(newText);
        // // item.textContent = "Hi";
        // // item.appendChild(document.createTextNode("Four"));
        // optionEl.appendChild(item);

    // for (var i = 0; i < favoriteFood.length; i++){
    //     var item = document.createElement("li");
    //     item.textContent = favoriteFood[i];
    //     item.setAttribute("id", optionCounter);
    //     optionEl.appendChild(item);
    //     optionCounter++;
    //     item.className = "btn";
    // }

//         var item = document.createElement("button");
//         item.textContent = favoriteFood[0];
//         item.setAttribute("id", optionCounter);
//         item.className = "btn-2";
//         optionEl.appendChild(item);
//         optionCounter++;
// }

    for (var i = 0; i < favoriteFood.length; i++){
        var item = document.createElement("li");
        item.textContent = favoriteFood[i];
        item.setAttribute("id", optionCounter);
        optionEl.appendChild(item);
        optionCounter++;
        item.className = "btn-2";
    }
}
// favoriteEl.appendChild(listEl);
// datesContainerEl.appendChild(favoriteEl);

startBtnEl.addEventListener("click", changeQuestion);

