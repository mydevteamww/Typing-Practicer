var texts = [ "Somebody once told me the world is gonna roll me. I ain't the sharpest tool in the shed. " +
 "She was looking kind of dumb with her finger and her thumb In the shape of an \"L\" on her forehead" ];
var index = 0;
var textObject = document.getElementById('text');
var inputObject = document.getElementById('inputObject');

var correct = document.getElementById('correct');
var incorrect = document.getElementById('incorrect');
var unselected = document.getElementById('unselected');

unselected.innerHTML = texts[index];

inputObject.addEventListener('input', function() {
    var text = inputObject.value;

    var words = text.split(' ');
    var indexCount = 0;
    for(let i = 0; i < words.length; i++) {
        var isRed = false

        var correctWord = texts[index].split(' ')[i];
        if(correctWord == undefined) { 
            isRed = true
        }
        else {
            if(correctWord == words[i]) {
                console.log("correct");
            }
        }
    }
});