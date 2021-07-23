var startButton = document.querySelector("#start-button");
var quizTimerCount = document.querySelector("#quiz-timer");
var quizQuestions = document.querySelector("#quizQuestions");
var intro = document.querySelector("#intro");
var quizQuestionsArea = document.querySelector("#question-container");
var questionElement = document.getElementById("quizQuestions");
var answerButtons = document.getElementById("multiple-choice-answers"); // or btn??
var gameOverArea = document.getElementById("quizResult");

var timeLeft = 75; //make it 75
var currentQuestionIndex = 0; // current question
var correctUserAnswers = 3;
var wrongUserAnswers = 1;
var answerBtn;
var state;

startButton.addEventListener("click", function () {
  console.log("It works! button pressed"); //making sure it works
  intro.classList.add("hide");
  quizQuestionsArea.classList.remove("hide");

  quizTime(); //calling the timer
  setNextQuestion();
});

function quizTime() {
  // this is the timer
  var quizTimer = setInterval(function () {
    timeLeft--;
    quizTimerCount.textContent = "Time Left: " + timeLeft + " seconds";

    if (timeLeft === 0) {
      clearInterval(quizTimer);
      quizTimerCount.textContent = "Out of time"; //this is temp
      quizOver();
    }
  }, 1000);
}

function setNextQuestion() {
  showQuestion(questions[currentQuestionIndex]); //we are setting the value of question
}
function showQuestion(question) {
  //question is what line 34
  questionElement.innerText = question.question;
  var answers = question.answers;
  answerButtons.innerHTML = " "; //is in charge of the text and element so here we are clearing it (the content of answerButtons)
  for (var i = 0; i < answers.length; i++) {
    answerBtn = document.createElement("button");
     state = answerBtn.setAttribute("data-state", answers[i].correct);

    answerBtn.innerText = answers[i].text;
    answerBtn.classList.add("btn");
    answerButtons.appendChild(answerBtn);

  
  }
}

answerButtons.addEventListener("click", function () {
  //currentQuestionIndex++;
  //setNextQuestion();
 state = answerBtn.getAttribute("data-state")
  if (state === "false") {
    console.log("wrong button clicked");
    wrongUserAnswers++;
    timeLeft = timeLeft - 10; // how to subtract 10?
  } else if (state.dataset.correct === "true") {
    console.log("correct button clicked");
    correctUserAnswers++;
  }

});


  

//things to do
//make the old questions hide
//how to check if it is correct
//subtract time if wrong
//if they finish the questions there needs to be something to call the functionquizOver
//is there a way to append button to input
//do i need the form if so how to append
//the name is scoreAndName doesnt show
function quizOver() {
  //need to hide the other stuff
  quizQuestionsArea.classList.add("hide");
  //created elements
  var quizOverText = document.createElement("h1");
  quizOverText.classList.add("quizOver");
  quizOverText.classList.add("quizOverText");
  var score = document.createElement("p");
  var initalsForm = document.createElement("form");
  initalsForm.classList.add("quizOver");
  initalsForm.classList.add("purpleText");
  var enterInitals = document.createElement("input");
  enterInitals.classList.add("quizOver");
  var submitInitals = document.createElement("button");
  submitInitals.classList.add("quizOver");
  var backButton = document.createElement("button");
  backButton.classList.add("btn");
  //submitInitals.classList.add("btn");
  //added text
  quizOverText.textContent = "Quiz is over";
  score.textContent =
    "Incorrect: " + wrongUserAnswers + " Correct: " + correctUserAnswers;
  initalsForm.textContent = "Add Initals";
  submitInitals.textContent = "Submit";
  backButton.textContent = "Go back";
  //appended
  gameOverArea.appendChild(quizOverText);
  gameOverArea.appendChild(score);
  gameOverArea.appendChild(initalsForm);
  gameOverArea.appendChild(enterInitals);
  gameOverArea.appendChild(submitInitals);
  gameOverArea.appendChild(backButton);
  //enterInitals.appendChild(submitInitals)
  //imput user submitted goes in
  var UserInitals = enterInitals.value;
  // if imput is submitted we want to call the scoreFunction
  submitInitals.addEventListener("click", function () {
    console.log("clicked button submit");

    var UserInputInitals = localStorage.getItem("UserInitals");
    localStorage.setItem("UserInitals", UserInitals);
    console.log(correctUserAnswers);
    console.log(UserInitals);
    var scoreAndName = document.createElement("h4");
    scoreAndName.textContent =
      UserInputInitals +
      "Score: " +
      correctUserAnswers +
      "/" +
      questions.length; //change for the number of questions
    gameOverArea.appendChild(scoreAndName);

    var UserScoreAndName = localStorage.setItem("scoreAndName", scoreAndName);

    console.log(localStorage.getItem(UserScoreAndName));
  });
  backButton.addEventListener("click", function () {
    console.log("clicked on back button");
    gameOverArea.classList.add("hide");
    intro.classList.remove("hide");
    //how to i reset the time
  });
}

var questions = [
  {
    question: "What is Javascript?",
    answers: [
      { text: "a language", correct: true },
      { text: "a dog", correct: false },
    ],
  },
  {
    question: "What is Java?",
    answers: [
      { text: "a ffflanguage", correct: true },
      { text: "afff dog", correct: false },
    ],
  },
  {
    question: "What is Java1?",
    answers: [
      { text: "a language", correct: true },
      { text: "a dog", correct: false },
    ],
  },
  {
    question: "What is Javascript1?",
    answers: [
      { text: "a language", correct: true },
      { text: "a dog", correct: false },
    ],
  },
];
console.log(questions[1]);

//function highScores() {}
/*


 if (answers.correct) {
      console.log("correct");
    }
*/
