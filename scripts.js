const menu = document.querySelector(".menu");
const gameButtons = menu.querySelectorAll(".gameButtons button");
const playerChoiceIcon = document.querySelector(".playerChoiceIcon img");
const computerChoiceIcon = document.querySelector(".computerChoiceIcon img");
const announcerPara = document.querySelector("#announcer");
const playerScorePara = document.querySelector("#playerScore");
const computerScorePara = document.querySelector("#computerScore");
const roundNumberPara = document.querySelector("#roundNumber");

const gameState = {
  roundNumber: 0,
  playerScore: 0,
  computerScore: 0,
};

function resetGameState() {
  gameState.roundNumber = 0;
  gameState.playerScore = 0;
  gameState.computerScore = 0;
  playerScorePara.textContent = 0;
  computerScorePara.textContent = 0;
  roundNumberPara.textContent = "Round #";
  announcerPara.textContent = "";
  playerChoiceIcon.src = "";
  computerChoiceIcon.src = "";
  toggleGameButtonsDisabled(false);
}

function getComputerChoice() {
  const randomized = Math.random();
  if (randomized <= 0.33) return "rock";
  return randomized > 0.66 ? "scissors" : "paper";
}

menu.addEventListener("click", (event) => {
  let target = event.target;
  if (target === menu) return;
  if (target.id === "reset") {
    resetGameState();
    return;
  }
  let playerSelection = target.id;
  keepScore(playRound(playerSelection, getComputerChoice()));
  roundStatusDisplayUpdate();
});

function playRound(playerChoice, computerChoice) {
  playerChoice = playerChoice.toLowerCase();
  handleIconSwap(playerChoiceIcon, playerChoice);
  handleIconSwap(computerChoiceIcon, computerChoice);

  const result = handleRoundWinner(playerChoice, computerChoice);

  playerChoice = capitalizeFirstLetter(playerChoice);
  computerChoice = capitalizeFirstLetter(computerChoice);
  handleRoundAnnouncement(result, playerChoice, computerChoice);
  return result;
}
function handleIconSwap(target, choice) {
  switch (choice) {
    case "rock":
      target.src = "svgs/rock.svg";
      break;
    case "paper":
      target.src = "svgs/paper.svg";
      break;
    case "scissors":
      target.src = "svgs/scissors.svg";
      break;
    default:
      return "Invalid icon choice.";
  }
}
function handleRoundWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "tie";
  let result;
  switch (playerChoice) {
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

function handleRoundAnnouncement(message, playerChoice, computerChoice) {
  switch (message) {
    case "tie":
      announcerPara.textContent = "Tie! Nobody wins.";
      break;
    case "computerWin":
      announcerPara.textContent = `The Computer wins! ${computerChoice} beats ${playerChoice}!`;
      break;
    case "playerWin":
      announcerPara.textContent = `The Player wins! ${playerChoice} beats ${computerChoice}!`;
      break;
    default:
      announcerPara.textContent = "Invalid end message.";
      break;
  }
}

function toggleGameButtonsDisabled(state) {
  gameButtons.forEach((button) => {
    button.disabled = state;
  });
}
function keepScore(roundResult) {
  gameState.roundNumber++;
  if (roundResult === "computerWin") gameState.computerScore++;
  else if (roundResult === "playerWin") gameState.playerScore++;

  if (gameState.computerScore === 5) {
    announcerPara.textContent =
      "The Computer wins! It is the first to 5 points.";
    toggleGameButtonsDisabled(true);
  } else if (gameState.playerScore === 5) {
    announcerPara.textContent =
      "The Player wins! They are the first to 5 points.";
    toggleGameButtonsDisabled(true);
  }
}

function roundStatusDisplayUpdate() {
  roundNumberPara.textContent = `Round #${gameState.roundNumber}`;
  computerScorePara.textContent = gameState.computerScore;
  playerScorePara.textContent = gameState.playerScore;
}

// Does not take empty strings.
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
