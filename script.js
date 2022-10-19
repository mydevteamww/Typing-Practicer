var texts = [ "Somebody" ];

//  var texts = [ "Somebody once told me the world is gonna roll me. I ain't the sharpest tool in the shed. " +
//  "She was looking kind of dumb with her finger and her thumb In the shape of an \"L\" on her forehead" ];


var index = 0;
var textObject = document.getElementById('text');
var inputObject = document.getElementById('inputObject');

var startButton = document.getElementById('start');
var startBgColor = startButton.style.backgroundColor;
var startColor = startButton.style.color; 
var startBgColorHover = "#378039";
var restartBgColor = "#c23838";
var restartColor = "#6e2020";
var restartBgColorHover = "#4a1414";
var stopButton = document.getElementById('stop');
var stopBgColor = restartBgColor;
var stopColor = restartColor;
var stopBgColorHover = restartBgColorHover;

var correct = document.getElementById('correct');
var incorrect = document.getElementById('incorrect');
var unselected = document.getElementById('unselected');

var timer = document.getElementById('timer');
var ongoingGame = false;

unselected.innerHTML = texts[index];

var startTime = 0; 

setInterval(timerTick, 1000);
startButton.innerHTML = "START";

startButton.addEventListener('click', function() {
    if(!ongoingGame) {
        startButton.style.backgroundColor = restartBgColor;
        startButton.style.color = restartColor;
        startButton.innerHTML = "RESTART"
        
        ongoingGame = true;
        var d = new Date()
        startTime = d.getTime();
        
    }
    
    resetScreen();
})
startButton.onmouseover = function() {
    if(startButton.innerHTML == "START") {
        startButton.style.backgroundColor = startBgColorHover;
    }
    else {
        startButton.style.backgroundColor = restartBgColorHover;
    }
}
startButton.onmouseleave = function() {
    if(startButton.innerHTML == "START") {
        startButton.style.backgroundColor = startBgColor;
    }
    else {
        startButton.style.backgroundColor = restartBgColor;
    }
}

stopButton.addEventListener('click', function() {
    resetScreen();
    ongoingGame = false; 

    startButton.style.backgroundColor = startBgColor;
    startButton.style.color = startColor;
    startButton.innerHTML = "START"
})
stopButton.onmouseover = function() {
    stopButton.style.backgroundColor = stopBgColorHover;
}
stopButton.onmouseleave = function() {
    stopButton.style.backgroundColor = stopBgColor;
}

inputObject.addEventListener('input', function() {
    if(ongoingGame) {
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

        if(correct.innerHTML == texts[index]) {
            ongoingGame = false;
            
            var d = new Date();
            var minutesPassed = (d.getTime() - startTime) / (1000*60);
            var speed = texts[index].split(' ').length / minutesPassed;
            addResults(Math.floor(speed));
        }
    }
    else {
        inputObject.value = "";
    }
});

function timerTick() {
    if(ongoingGame) {
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
}

function resetScreen() {
    timer.innerHTML = "00:00";
        
    correct.innerHTML = "";
    incorrect.innerHTML = "";
    unselected.innerHTML = texts[index];

    inputObject.value = "";
}

function addResults(speed) {
    var results = document.getElementById('results');
    var amountOfResults = results.childElementCount;

    var timeText = document.querySelector('#results tr:nth-child(2) th:nth-child(2)');
    var speedText = document.querySelector('#results tr:nth-child(2) th:nth-child(3)');

    if(amountOfResults == 1 && timeText.style.color == "white") {
        amountOfResults = 0; 
    }

    if(amountOfResults == 0) {
        timeText.style.color = "black";
        speedText.style.color = "black";

        /* Format: 2022-10-18, 11:28:23 */
        var d = new Date();
        function fixedLength(i) {
            if(i < 10) {
                i = "0" + i;
            }
            return i;
        }

        timeText.innerHTML = d.getFullYear() + "-" + 
            fixedLength(d.getMonth()) + "-" + 
            fixedLength(d.getDate()) + ", " + 
            fixedLength(d.getHours()) + ":" + 
            fixedLength(d.getMinutes()) + ":" + 
            fixedLength(d.getSeconds());

        speedText.innerHTML = speed + " wpm";
    }
    else {

        var count = document.createElement("th");
        var timeText_ = document.createElement("th");
        var speedText_ = document.createElement("th");

        var resultsRow = document.createElement("tr");
        resultsRow.appendChild(count);
        resultsRow.appendChild(timeText_);
        resultsRow.appendChild(speedText_);

        results.appendChild(resultsRow);

        count.innerHTML = results.childElementCount + ".";

        timeText_.style.color = "black";
        speedText_.style.color = "black";

        /* 2022-10-18, 11:28:23 */
        var d = new Date();
        function fixedLength(i) {
            if(i < 10) {
                i = "0" + i;
            }
            return i;
        }

        timeText_.innerHTML = d.getFullYear() + "-" + 
            fixedLength(d.getMonth()) + "-" + 
            fixedLength(d.getDate()) + ", " + 
            fixedLength(d.getHours()) + ":" + 
            fixedLength(d.getMinutes()) + ":" + 
            fixedLength(d.getSeconds());

            speedText_.innerHTML = speed + " wpm";
    }
}