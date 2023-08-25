var playing = false;
var score = 0;
var timeremaining = 60;
var correctAnswer;
var highscore = 0;

document.getElementById("startreset").onclick = function () {
    if (playing) {
        location.reload();
    } else {
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining");
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameOver");
        document.getElementById("startreset").innerHTML = "Reset Game";
        startCountdown(); // Call startCountdown only when the game starts
        generateQA();
    }
};

for (var i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        if (playing) {
            if (this.innerHTML == correctAnswer) {
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    };
}

function startCountdown() {
    timeremaining = 60;
    action = setInterval(function () {
        timeremaining--;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            stopCountdown();
            show("gameOver");
            if (score > highscore) {
                highscore = score;
                document.getElementById("highscore").innerHTML = "High Score: " + highscore;
            }
            document.getElementById("gameOver").innerHTML = `<p>Game over!</p><p>Your score is ${score}.</p><p>High Score: ${highscore}.</p>`;
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = `${x} &times; ${y}`;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];

    for (var i = 1; i < 5; i++) {
        if (i !== correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
