// alert("OK");
var buttonColours = ["red", "blue", "green", "yellow"];
var buttonSound = "";

var gamePattern = [];
var userClickedPattern = [];
var pressCount = 0;
var level = 1;

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  pressCount = 0;
  level = 1;
}

$(document).keydown(function() {
  if (gamePattern.length === 0) {
    nextSequence();
  }
})

function nextSequence() {
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  $("#" + randomChoosenColour).fadeOut().fadeIn();
  playSound(randomChoosenColour);
  level++;
}

function playSound(name) {
  soundFile = "sounds/" + name + ".mp3";
  var buttonSound = new Audio(soundFile);
  buttonSound.play();
}

$(".btn").click(function() {
  pressCount++;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(pressCount - 1);
})

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if ((currentLevel + 1) === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
        pressCount = 0;
      }, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key To Resatar");
}
