const menu = document.querySelector(".menu");
const gameButtons = menu.querySelectorAll("button");
const playerPara = document.querySelector("#player");
const computerPara = document.querySelector("#computer");
const announcerPara = document.querySelector("#announcer");
const playerScorePara = document.querySelector("#playerScore");
const computerScorePara = document.querySelector("#computerScore");
const roundNumberPara = document.querySelector("#roundNumber");

const gameState = {
  roundNumber: 0,
  playerScore: 0,
  computerScore: 0,
};

function getComputerChoice() {
  const randomized = Math.random();
  if (randomized <= 0.33) return "rock";
  return randomized > 0.66 ? "scissors" : "paper";
}

menu.addEventListener("click", (event) => {
  let target = event.target;
  if (target === menu) return;
  let playerSelection = target.id;
  keepScore(playRound(playerSelection, getComputerChoice()));
  roundStatusDisplayUpdate();
});

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();
  computerPara.textContent = `The Computer chooses ${computerChoice}`;
  playerPara.textContent = `The Player chooses ${humanChoice}`;

  const result = handleRoundWinner(humanChoice, computerChoice);

  humanChoice = capitalizeFirstLetter(humanChoice);
  computerChoice = capitalizeFirstLetter(computerChoice);
  handleRoundAnnouncement(result, humanChoice, computerChoice);
  return result;
}

function handleRoundWinner(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return "tie";
  let result;
  switch (humanChoice) {
    case "rock":
      result = computerChoice === "paper" ? "computerWin" : "playerWin";
      break;
    case "paper":
      result = computerChoice === "scissors" ? "computerWin" : "playerWin";
      break;
    case "scissors":
      result = computerChoice === "rock" ? "computerWin" : "playerWin";
      break;
    default:
      return "Invalid player choice.";
  }
  return result;
}

function handleRoundAnnouncement(message, humanChoice, computerChoice) {
  switch (message) {
    case "tie":
      announcerPara.textContent = "Tie! Nobody wins.";
      break;
    case "computerWin":
      announcerPara.textContent = `The Computer wins! ${computerChoice} beats ${humanChoice}!`;
      break;
    case "playerWin":
      announcerPara.textContent = `The Player wins! ${humanChoice} beats ${computerChoice}!`;
      break;
    default:
      announcerPara.textContent = "Invalid end message.";
      break;
  }
}
function toggleGameState() {
  gameButtons.forEach((button) => {
    button.disabled = !button.disabled;
  });
}
function keepScore(roundResult) {
  gameState.roundNumber++;
  if (roundResult === "computerWin") gameState.computerScore++;
  else if (roundResult === "playerWin") gameState.playerScore++;

  if (gameState.computerScore === 5) {
    announcerPara.textContent =
      "The Computer wins! It is the first to 5 points.";
    toggleGameState();
  } else if (gameState.playerScore === 5) {
    announcerPara.textContent =
      "The Player wins! They are the first to 5 points.";
    toggleGameState();
  }
}

function roundStatusDisplayUpdate() {
  roundNumberPara.textContent = `The current round number: ${gameState.roundNumber}`;
  computerScorePara.textContent = `The Computer has ${gameState.computerScore} points`;
  playerScorePara.textContent = `The Player has ${gameState.playerScore} points`;
}

// Does not take empty strings.
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
