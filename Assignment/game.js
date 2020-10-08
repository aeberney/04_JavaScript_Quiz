const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What comes at the end of a line of code in JavaScript?",
    choice1: "Colon",
    choice2: "Semicolon",
    choice3: "Period",
    choice4: "Comma",
    answer: 2,
  },
  {
    question: "What is NOT a common phrase used in JavaScript?",
    choice1: "Let",
    choice2: "Var",
    choice3: "Body",
    choice4: "Const",
    answer: 3,
  },
  {
    question: "Commonly used data types DO NOT include ___",
    choice1: "Booleans",
    choice2: "Strings",
    choice3: "Numbers",
    choice4: "Alerts",
    answer: 1,
  },
  {
    question: "Who is going to be a master of JavaScript?",
    choice1: "Not You",
    choice2: "I Have No Clue What JavaScript Is",
    choice3: "Who Is Asking All Of These Questions?",
    choice4: "You",
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
