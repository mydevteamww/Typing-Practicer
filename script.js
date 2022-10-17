var texts = [ "Somebody once told me the world is gonna roll me. I ain't the sharpest tool in the shed. " +
 "She was looking kind of dumb with her finger and her thumb In the shape of an \"L\" on her forehead" ];
var index = 0;
var textObject = document.getElementById('text');
var inputObject = document.getElementById('inputObject');

var correct = document.getElementById('correct');
var incorrect = document.getElementById('incorrect');
var unselected = document.getElementById('unselected');

var timer = document.getElementById('timer');
var startButton = document.getElementById('start');
var hasStarted = false;

unselected.innerHTML = texts[index];

startButton.addEventListener('click', function() {
    if(!hasStarted) {
        startButton.style.backgroundColor = "#ddd";
        startButton.style.color = "#555";

        setInterval(timerTick, 1000);
        
        hasStarted = true;
    }
})

inputObject.addEventListener('input', function() {
    var text = inputObject.value;

    var correctIndex = 0;
    for(let i = 0; i < text.length && i < texts[index].length; i++) {
        if(text[i] != texts[index][i]) {
            break;
        }
        else {
            correctIndex++;
        }
    }
    
    var incorrectIndex = correctIndex;
    if(correctIndex < text.length) { // If not everything in input is correct
        if(text.length <= texts[index].length) {
            incorrectIndex = text.length;
        }
        else {
            incorrectIndex = texts[index].length;
        }
    }

    correct.innerHTML = texts[index].substring(0, correctIndex);
    incorrect.innerHTML = texts[index].substring(correctIndex, incorrectIndex);
    unselected.innerHTML = texts[index].substring(incorrectIndex);
});

function timerTick() {
    var seconds = parseInt(timer.innerHTML.substring(3));
    var minutes = parseInt(timer.innerHTML.substring(0, 2));

    var secondsText = "";
    var minutesText = "";

    seconds++;
    if(seconds >= 60) {
        secondsText = "00";
        minutes++;
    }
    else if(seconds < 10) {
        secondsText = "0" + seconds;
    }
    else {
        secondsText = seconds;
    }

    if(minutes < 10) {
        minutesText = "0" + minutes;
    }
    else {
        minutesText = minutes;
    }

    timer.innerHTML = minutesText + ":" + secondsText;
}