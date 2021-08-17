highScoreArea = document.querySelector("#highScores");
//real array
//var UserArray = localStorage.getItem("UserInitals");

//console.log(UserArray);
//array to test...
var UserArray = ["HI", "byt"];
console.log(localStorage.getItem("UserInitals"));
var UserArray = JSON.parse(localStorage.getItem("UserInitals"));
var UserArray = JSON.parse(localStorage.getItem("UserInitals"));

for (var i = 0; i < UserArray.length; i++) {
  var scoreAndName = document.createElement("h4");
  scoreAndName.classList.add("quizOver");
  scoreAndName.classList.add("purpleText");
  scoreAndName.textContent = UserArray[i].name + " " + UserArray[i].score;
  highScoreArea.appendChild(scoreAndName);

  var UserScoreAndName = localStorage.setItem("scoreAndName", scoreAndName);
}


backButton.addEventListener("click", function () {
  console.log("clicked on back button");
  window.location.href = "index.html";
});
