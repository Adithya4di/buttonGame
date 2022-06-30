var clicked = [];
var pattern = [];
var list = ["red", "green", "blue", "yellow"];
var result = false;

var level = 1;

$(document).keypress(function() {
  if (!result) {
    $("h1").text("Level " + level);
    nextsql();
    result = true;
  }
});


  $(".btn").click(function() {
    var usercolor = $(this).attr("id");
    clicked.push(usercolor);
    sounds(usercolor);
    animatepress(usercolor);
    checkAnswer(clicked.length-1);
  });

function nextsql() {
  $("h1").text("LEVEL  " + level);
  level++;
  var num = Math.floor(Math.random() * 4);
  pattern.push(list[num]);
  var final = pattern[pattern.length - 1];
  sounds(final);
  animatepress(final);
  $("#" + final).fadeIn(100).fadeOut(100).fadeIn(100);
}

function sounds(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatepress(element) {
  $("#" + element).addClass("pressed");
  setTimeout(function() {
    $("#" + element).removeClass("pressed");
  }, 100);
}

function checkAnswer(current){
      if(clicked[current] == pattern[current]){
        console.log("success");
        if(clicked.length === pattern.length ){
          clicked.length=0;
          setTimeout(function() {
            nextsql();
          },1000);
        }
      }

    else{
        var a = new Audio("sounds/wrong.mp3");
        a.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("GAME OVER...PRESS ANY KEY TO RESTART");
        startOver();
    }
  }


function startOver(){
  level = 1;
  clicked=[];
  pattern=[];
  result=false;
}
