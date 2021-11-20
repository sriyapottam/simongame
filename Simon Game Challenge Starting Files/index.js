var gamePattern=[];
var colors=["red","blue","green","yellow"];
var userPattern=[];
var level=0;
var started=false;
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
$(".btn").click(function(){
    var userChoosencolor=$(this).attr("id");
    userPattern.push(userChoosencolor);
    playSound(userChoosencolor);
    animatePress(userChoosencolor);
    checkAnswer(userPattern.length-1);
})


function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomColour=colors[randomNumber];
    gamePattern.push(randomColour);
    $("#"+randomColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

}
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  
  