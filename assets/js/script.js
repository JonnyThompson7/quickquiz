
let secondsLeft = 90;

let timer = document.getElementById("timer");

let scoresDiv = document.getElementById("scores-div");

let buttonsDiv = document.getElementById("buttons")

let viewScoresBtn = document.getElementById("view-scores")

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);

var questionDiv = document.getElementById("question-div");

let results = document.getElementById("results");

var choices = document.getElementById("choices");

let emptyArray = [];

let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

var questionCount = 0;

let score = 0;
// Function to start the timer
function setTime() {
    displayQuestions();
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = "";
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            captureUserScore();
        }
    }, 1000);
}
// Function to load Questions
function displayQuestions() {
    removeEventListener(startButton);
    if (questionCount < questions.length) {
        questionDiv.innerHTML = questions[questionCount].title;
        choices.textContent = "";
        for (let i = 0; i < questions[questionCount].multiChoice.length; i++) {
            let el = document.createElement("button");
            el.innerText = questions[questionCount].multiChoice[i];
            el.setAttribute("data-id", i);
            el.addEventListener("click", function (event) {
                event.stopPropagation();
                if (el.innerText === questions[questionCount].answer) {
                    score += secondsLeft;
                } else {
                    score -= 10;
                    secondsLeft = secondsLeft - 15;
                }
                questionDiv.innerHTML = "";
                if (questionCount === question.length) {
                    return;
                } else {
                    questionCount++;
                    displayQuestions();
                }
            });
            choices.append(el);
        }
    }
}

function captureUserScore() {
    timer.remove();
    choices.textContent = "";

    let initialsInput = document.createElement("input");
    let postScoreBtn = document.createElement("input");

    results.innerHTML = 'You scored ${score} points! Enter initials or nickname: ';
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("type", "button");
    initialsInput.setAttribute("value", "Post My Score!");
    postScoreBtn.addEventListener("click", function (event) {
        let scoresArray = defineScoesArray(storedArray. emptyArray);
        let initials = initialsInput.value;
        let userAndScore = {
            initials: initials,
            score: score,
        };
        scoresArray.push(userAndScore);
        saveScores(scoresArray);
        displayAllScores();
        clearScoresBtn();
        goBackBtn();
        viewScoresBtn.remove();
    });
    results.append(initialsInput);
    results.append(postScoreBtn);
}

const saveScores = (array) => {
    window.localStorage.setItem("highScores", JSON.stringify(array));
}