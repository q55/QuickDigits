let myString = "";
let numScore = 0;
let timer = 3;
let timerInterval;

// Start Game Function
function startGame() {
  // Hide the start screen and show the game interface
  document.getElementById("startScreen").style.display = "none";
  document.querySelector("header").style.display = "block"; // Show header
  document.getElementById("container").style.display = "block"; // Show game container
  GenerateRandomNumber(); // Start the game
}

// Generate a random 5-digit number
function GenerateRandomNumber() {
  myString = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  document.getElementById("randomNumH1").textContent = myString;
  resetGame();
}

// Timer Logic
function startTimer() {
  const timerText = document.getElementById("timer");
  const timerLitterS = document.getElementById("timerLitterS");

  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      timerText.textContent = timer;
    } else {
      clearInterval(timerInterval);
      hideRandomNumber();
      timerText.textContent = "Time's up!";
      timerLitterS.textContent = "";
      enableInput();
    }
  }, 1000);
}

// Hide the random number
function hideRandomNumber() {
  const randomNumElement = document.getElementById("randomNumH1");
  randomNumElement.textContent = "#####";
}

// Show feedback and blur container
function showFeedback(isCorrect) {
  const container = document.getElementById("container");
  const feedbackSymbol = document.createElement("div");

  feedbackSymbol.id = "feedbackSymbol";
  feedbackSymbol.textContent = isCorrect ? "✔" : "✘";
  feedbackSymbol.className = isCorrect ? "feedback-success" : "feedback-error";

  document.body.appendChild(feedbackSymbol);
  container.classList.add("blurred");

  setTimeout(() => {
    feedbackSymbol.classList.add("fade-out");
    setTimeout(() => {
      feedbackSymbol.remove();
      container.classList.remove("blurred");
      GenerateRandomNumber();
    }, 10);
  }, 800);
}

// Check validation
function CheckValidate() {
  const input = document.getElementById("userInput").value;
  clearInterval(timerInterval);

  if (input === myString) {
    numScore++;
    document.getElementById("scoreNum").textContent = numScore;
    showFeedback(true);
  } else {
    numScore = 0;
    document.getElementById("scoreNum").textContent = numScore;
    showFeedback(false);
  }
}

// Reset game
function resetGame() {
  clearInterval(timerInterval);
  timer = 3;
  document.getElementById("timer").textContent = timer;
  document.getElementById("timerLitterS").textContent = "s";
  disableInput();
  startTimer();
}

// Input state
function disableInput() {
  const input = document.getElementById("userInput");
  input.disabled = true;
  input.value = "";
  input.placeholder = "Wait for the timer...";
}

function enableInput() {
  const input = document.getElementById("userInput");
  input.disabled = false;
  input.placeholder = "Enter the number here...";
}

// Initialize the game
window.onload = () => {
  document.getElementById("startScreen").style.display = "flex"; // Show start screen
};
