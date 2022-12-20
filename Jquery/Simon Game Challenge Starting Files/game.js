var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var randomChosenColour;

var started = false;

var level = 0;

function playSound(name) {

  var audio = new Audio(name);

  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("sounds\\wrong.mp3");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function nextSequence() {
  userClickedPattern = [];
  
  level++;

  $("#level-title").text("Level " + level);

  var randomNUmber = Math.floor(Math.random() * 4);

  randomChosenColour = buttonColours[randomNUmber];

  gamePattern.push(randomChosenColour);

  var selectedColor = $("#" + randomChosenColour);

  selectedColor.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound("sounds//" + randomChosenColour + ".mp3");

  animatePress(selectedColor);


}

$(document).on("keydown", function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});


$(".btn").on("click", function() {

  var userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);


  playSound("sounds//" + userChosenColour + ".mp3");

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});
