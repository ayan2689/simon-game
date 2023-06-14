var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;

var easy = false;

$(".easy").click(function() {
  if(!started) {
    $(".difficulty").css("visibility","hidden");
    $("#level-title").css("color","#FEF2BF");
    easySequence();
    started = true;
    easy = true;
  }
});

$(".hard").click(function() {
  if(!started) {
    $(".difficulty").css("visibility","hidden");
    $("#level-title").css("color","#FEF2BF");
    hardSequence();
    started = true;
  }
});

function easySequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  playContinue();
}

function hardSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function() {
  if (started === true) {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  }
});

function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      if (easy === true) {
        setTimeout (function () {
          easySequence();
        }, 1000);
      } else {
        setTimeout (function () {
          hardSequence();
        }, 1000);
      }
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").css("color","red");
    $("#level-title").text("Game Over, Choose Difficulty Mode to Restart");
    $(".difficulty").css("visibility","visible");

    startOver();
  }

}

function playContinue() {
  var i = 0;
  const intervalId = setInterval(function() {
    $("#"+gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    i++;
    if (i === gamePattern.length) {
        clearInterval(intervalId);
      }
    }, 400);
}

function startOver() {
  if (level > 0) {
    highScore = level;
    $("h2").text("High Score: "+highScore);
  }
  level = 0;
  gamePattern = [];
  started = false;
  easy = false;
}

function playSound(name) {
  var audio = new Audio("./sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
