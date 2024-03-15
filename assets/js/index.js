//Questions

const questions = [
    {
        prompt: "Inside which HTML element do we put the JavaScript?",
        options: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        prompt: "How do you link a CSS file to an HTML document?",
        options: ["<style>", "<link>", "<css>", "<href>"],
        answer: "<link>"
    },
    {
        prompt: "Which HTML tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        prompt: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Coded Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        prompt: "Which HTML tag is used to define an unordered list?",
        options: ["<ul>", "<list>", "<ol>", "<li>"],
        answer: "<ul>"
    },
    {
        prompt: "How do you comment in JavaScript?",
        options: ["<!-- comment -->", "/* comment */", "// comment", "# comment"],
        answer: "// comment"
    },
    {
        prompt: "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "color", "font-color", "text-style"],
        answer: "color"
    },
    {
        prompt: "How do you declare a CSS class in a stylesheet?",
        options: [".classname", "#classname", "classname:", "classname()"],
        answer: ".classname"
    },
    {
        prompt: "What is the correct way to select an element with the id 'example' using JavaScript?",
        options: ["getElement('example')", "document.select('#example')", "document.querySelector('#example')", "document.getElementById('example')"],
        answer: "document.getElementById('example')"
    },
    {
        prompt: "What does the 'float' property do in CSS?",
        options: ["Aligns text to the left or right within its container", "Causes an element to move up and down", "Makes an element transparent", "Adds a shadow to an element"],
        answer: "Aligns text to the left or right within its container"
    }
];

// DOM elements
const questionsElement = document.querySelector("#questions");
const timerElement = document.querySelector("#time");
const choicesElement = document.querySelector("#choices");
const initialsElement = document.querySelector("#initials");
const feedbackElement = document.querySelector("#feedback");
const submitButton = document.querySelector("#submit");
const highScoresList = document.querySelector("#highscores");
const clearHighScoresButton = document.querySelector("#clear")

// Quiz state
let currentQuestion = 0;
let time = questions.length * 20;
let timerID;
let score = 0;

// Initialize quiz
function initializeQuiz() {
    time = questions.length * 20;
    currentQuestion = 0;
    feedbackElement.textContent = "";
    initialsElement.value = "";
    score = 0;
}

// Play sound for correct answer
function playCorrectSound() {
    const correctSound = document.getElementById("correct-sound");
    correctSound.play();
}

// Play sound for wrong answer
function playWrongSound() {
    const wrongSound = document.getElementById("wrong-sound");
    wrongSound.play();
}

// Event listeners
if (window.location.pathname.endsWith("/index.html")) {
    document.getElementById("start").addEventListener("click", startQuiz);
}

// Start quiz
function startQuiz() {
    initializeQuiz();
    timerID = setInterval(clockTick, 1000);
    timerElement.textContent = time;
    document.getElementById("start-screen").classList.add("hide");
    questionsElement.classList.remove("hide");
    getQuestion();
}

// Display current question
function getQuestion() {
    const shownQuestion = questions[currentQuestion];
    const promptElement = document.getElementById("question-title");
    promptElement.textContent = shownQuestion.prompt;
    choicesElement.innerHTML = "";

    shownQuestion.options.forEach((option, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = option;
        choiceButton.addEventListener("click", () => questionClick(option));
        choicesElement.appendChild(choiceButton);
    });
}

// Handle question click
function questionClick(userChoice) {
    const correctAnswer = questions[currentQuestion].answer;
    const isCorrect = userChoice === correctAnswer;

    if (isCorrect) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
        playCorrectSound();
        score += 1
    } else {
        feedbackElement.textContent = `Wrong! The correct answer was ${correctAnswer}.`;
        feedbackElement.style.color = "red";
        time = Math.max(time - 10, 0);
        timerElement.textContent = time;
        playWrongSound();
    }

    feedbackElement.classList.remove("hide");
    setTimeout(() => {
        feedbackElement.classList.add("hide");
        if (++currentQuestion < questions.length) {
            getQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

// End quiz
function endQuiz() {
    clearInterval(timerID);
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("final-score").textContent = score;
    questionsElement.classList.add("hide");

    // Function to handle saving initials
    function saveInitials() {
        const initials = initialsElement.value.trim();
        if (initials !== "") {
            const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            highScores.push({ initials: initials, score: score });
            localStorage.setItem("highScores", JSON.stringify(highScores));
            
            console.log("Score and initials saved to local storage.");
            redirectToHighScoresPage()
        } else {
            alert("Please enter your initials.");
        }
    }

    submitButton.addEventListener("click", saveInitials);
}

function redirectToHighScoresPage() {
    window.location.href = "highscores.html"; 
}

// Function to display high scores on the highscores.html page
function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    // Sort high scores by score (descending order)
    highScores.sort((a, b) => b.score - a.score);

    // Clear any existing content
    highScoresList.innerHTML = "";

    // Create a list item for each high score and append it to the list
    highScores.forEach((scoreData, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${scoreData.initials}: ${scoreData.score}`;
        highScoresList.appendChild(listItem);
    });
}

function clearHighScores() {
    localStorage.removeItem("highScores");
    highScoresList.innerHTML = ""; 
    console.log("High scores cleared from local storage.");
}

clearHighScoresButton.addEventListener("click", clearHighScores)

document.addEventListener("DOMContentLoaded", function() {
    displayHighScores();
});


// Handle timer tick
function clockTick() {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}


