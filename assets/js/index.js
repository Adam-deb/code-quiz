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

// Quiz state
let currentQuestion = 0;
let time = questions.length * 20;
let timerID;

// Initialize quiz
function initializeQuiz() {
    time = questions.length * 20;
    currentQuestion = 0;
    feedbackElement.textContent = "";
    initialsElement.value = "";
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
    }, 2000);
}

// End quiz
function endQuiz() {
    clearInterval(timerID);
    document.getElementById("end-screen").classList.remove("hide");
    document.getElementById("final-score").textContent = time;
    questionsElement.classList.add("hide");
}

// Handle timer tick
function clockTick() {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

// Event listeners
document.getElementById("start").addEventListener("click", startQuiz);
