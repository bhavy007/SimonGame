var randomColors = ["red","blue","green","yellow"];
var gamePattern =[];
var clickedPattern=[];
var started = false;
var level=0;






$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click",function(){
  var userChosenColour= $(this).attr("id");
  clickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(clickedPattern.length-1);
});





function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === clickedPattern[currentLevel]) {

      console.log("success");


      if (clickedPattern.length === gamePattern.length){


        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var audioWrong= new Audio("sounds/wrong.mp3");
      audioWrong.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over! Refresh to play again!")

    }

}


function nextSequence(){
clickedPattern=[];
  level++;
  $("h1").text("Level "+level);
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = randomColors[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeOut(200).fadeIn(200);

$("#"+randomChosenColour).on("click",function(){
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
});
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
