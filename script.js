//things to do
//fix buttons look
//if they finish the questions there needs to be something to call the functionquizOver
//is there a way to append button to input
//do i need the form if so how to append
//the name is scoreAndName doesnt show
//if questions are done then call the quiz over function

var startButton = document.querySelector("#start-button");
var quizTimerCount = document.querySelector("#quiz-timer");
var quizQuestions = document.querySelector("#quizQuestions");
var intro = document.querySelector("#intro");
var quizQuestionsArea = document.querySelector("#question-container");
var questionElement = document.getElementById("quizQuestions");
var answerButtons = document.getElementById("multiple-choice-answers"); // or btn??
var gameOverArea = document.getElementById("quizResult");
var inputFromUser = document.querySelector("inputFromUser"); //for the user input

var timeLeft = 75; //make it 75
var currentQuestionIndex = 0; // current question
var correctUserAnswers = 0;
var wrongUserAnswers = 0;
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

    if (timeLeft <= 0 || currentQuestionIndex + 1 == questions.length) {
      clearInterval(quizTimer);
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
    answerBtn.setAttribute("data-state", answers[i].correct);

    answerBtn.innerText = answers[i].text;
    answerBtn.classList.add("btn");
    answerButtons.appendChild(answerBtn);
  }
}

answerButtons.addEventListener("click", function (event) {
  var element = event.target; //this is the target or the selected element (button)
  var state = element.getAttribute("data-state"); //retrives value of target element

  if (state === "false") {
    console.log("wrong button clicked");

    wrongUserAnswers++;

    timeLeft = timeLeft - 10;
  } else {
    console.log("correct button clicked");
    correctUserAnswers++;
  }
  currentQuestionIndex++;
  setNextQuestion();
  console.log(currentQuestionIndex, questions.length);
  if (currentQuestionIndex + 1 < questions.length) {
    //we need +1 because the questions object start with 1
    setNextQuestion();
  }
});

function quizOver() {
  //need to hide the other stuff
  quizQuestionsArea.classList.add("hide");
  //created elements
  var quizOverText = document.createElement("h1");
  quizOverText.classList.add("quizOver");
  quizOverText.classList.add("quizOverText");
  var divForForm = document.createElement("div");
  divForForm.classList.add("divForm")
  var score = document.createElement("p");
  var initalsForm = document.createElement("p"); //what is form for?
  initalsForm.classList.add("quizOver");
  initalsForm.classList.add("purpleText");
  var enterInitals = document.createElement("input");
  enterInitals.classList.add("inputQuizOver");
  enterInitals.classList.add("quizOver");
  enterInitals.classList.add("inputFromUser");
  var submitInitals = document.createElement("button");
  submitInitals.classList.add("quizOver");
  var backButton = document.createElement("button");
  backButton.classList.add("btnEnd");
  submitInitals.classList.add("btnEnd");
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
  gameOverArea.appendChild(divForForm);
  divForForm.appendChild(enterInitals);
  divForForm.appendChild(submitInitals); //here try to append the text

  gameOverArea.appendChild(backButton);
  //enterInitals.appendChild(submitInitals)

  // if imput is submitted we want to call the scoreFunction
  submitInitals.addEventListener("click", function (event) {
    event.preventDefault();

    //then need to append it
    var inputFromUser = document.querySelector(".inputFromUser").value;

    localStorage.setItem("UserInitals", inputFromUser);
    var UserInputInitals = localStorage.getItem("UserInitals");

    if (inputFromUser === "") {
      console.log("Empty");
      return;
    }

    var scoreAndName = document.createElement("h4");
    scoreAndName.classList.add("quizOver");
    scoreAndName.classList.add("purpleText");
    scoreAndName.textContent =
      UserInputInitals +
      " " +
      "Score: " +
      correctUserAnswers +
      "/" +
      questions.length;
    gameOverArea.appendChild(scoreAndName);

    var UserScoreAndName = localStorage.setItem("scoreAndName", scoreAndName);

    console.log(localStorage.getItem(UserScoreAndName));
  });
  backButton.addEventListener("click", function () {
    console.log("clicked on back button");
    gameOverArea.classList.add("hide");
    intro.classList.remove("hide");
    window.location.reload(); //to reset everything in terms of the visual part
  });
}

var questions = [
  {
    question: "What is Javascript?",
    answers: [
      { text: "1. A programing language", correct: true },
      { text: "2. A typing language", correct: false },
      { text: "3. A spoken language", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "1. <js>", correct: false },
      { text: "2. <scripting>", correct: false },
      { text: "3. <javascript>", correct: false },
      { text: "4. <script>", correct: true },
    ],
  },
  {
    question: "What is javascript used for?",
    answers: [
      { text: "1. Styling web pages", correct: false },
      { text: "2. colors web pages", correct: false },
      { text: "3. interactive web pages", correct: true },
      { text: "4. making the skeleton of web pages", correct: false },
    ],
  },
  {
    question: "What kind of things can you make with JavaScript",
    answers: [
      {
        text: "1. display information when a button is clicked",
        correct: false,
      },
      {
        text: "2. Create a dropdown menu that activates when clicked",
        correct: false,
      },
      { text: "3. Show a series of tabs on a website", correct: false },
      { text: "4. All of the above", correct: true },
      { text: "5. None of the above", correct: false },
    ],
  },
  {
    question: "Can you use JavaScript for game development?",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false },
    ],
  },
  {
    question: "What popular website uses and really needs JavaScript?",
    answers: [
      { text: "PayPal", correct: true },
      { text: "Wikepedia", correct: false },
    ],
  },
  {
    question: "What is JavaScript mostly used in?",
    answers: [
      { text: "Font-end", correct: true },
      { text: "Back-end", correct: false },
    ],
  },
  {
    question: "Is JavaScript related to Java?",
    answers: [
      { text: "False", correct: false },
      { text: "True", correct: true },
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
