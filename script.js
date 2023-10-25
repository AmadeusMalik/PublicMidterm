// Questions

const questions = [
  {
    // Question 1
    question: "What instument does Kenny G play?",
    answers: [
      { text: "He plays a guitar", correct: false },
      { text: "He plays the saxophone", correct: true },
    ],
  },
  {
    //Question 2
    question: "How much money did Sonny Rollins sell his catalog for?",
    answers: [
      { text: "2 Million dollars", correct: false },
      { text: "2 Billion Dollars", correct: true },
    ],
  },
  {
    //Question 3
    question: "Where was Kenny G born?",
    answers: [
      { text: "Canada", correct: false },
      { text: "Seattle, Washington", correct: true },
    ],
  },
  {
    //Question 4
    question: "When was Stan Getz Born?",
    answers: [
      { text: "July 2nd, 1928", correct: false },
      { text: "February 2nd, 1927", correct: true },
    ],
  },
];
// HTML iDs
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Cuurent question

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  // Clear the answer buttons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }

  // Get the current question
  let currentQuestion = questions[currentQuestionIndex];

  // Display the question
  questionElement.innerHTML = currentQuestion.question;

  // Create answer buttons for each answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  // Display the next button
  nextButton.style.display = "none";
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Try again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
