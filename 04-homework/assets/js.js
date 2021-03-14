//arrray of the quiz questions and correct answers     
var questions = [{
        title: "One + One =",
        choices: ["2", "3", "4", "5"],
        answer: "2"
    },
    {
        title: "What color is an Orange?",
        choices: ["Orange", "Red", "Blue", "Green"],
        answer: "Orange"
    },
    {
        title: "Web pages starts with which of the following tags?",
        choices: ["body", "title", "html", "form"],
        answer: "title"
    },
    {
        title: "What day comes after Sunday?",
        choices: ["Thursday", "Friday", "Monday", "Wednesday"],
        answer: "Monday"
    },
    {
        title: "Which HTML attribute is used to define inline styles?",
        choices: ["font", "class", " style", "body"],
        answer: "style"
    },
    {
        title: "What does DOM stand for?",
        choices: ["Doctor of Medicine", "Document Object Model", "Day of Month", "Delivery of Mail"],
        answer: "Document Object Model"
    }
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//Timer controls
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store scores
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score if user clicks 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15; 
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}