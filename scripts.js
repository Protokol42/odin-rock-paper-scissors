//playGame();
function getComputerChoice() {
  const randomized = Math.random();
  if (randomized <= 0.33) return "rock";
  return randomized > 0.66 ? "scissors" : "paper";
}

function getHumanChoice() {
  return prompt("Choose rock, paper or scissors!").trim();
}

let menu = document.querySelector(".menu");
let playerPara = document.querySelector("#player");
let computerPara = document.querySelector("#computer");
let announcerPara = document.querySelector("#announcer");

menu.addEventListener("click", (event) => {
  let target = event.target;
  if (target === menu) return;
  let playerSelection = target.id;
  playRound(playerSelection, getComputerChoice());
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

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  for (let step = 0; step < 5; step++) {
    let result = playRound(getHumanChoice(), getComputerChoice());
    if (result === "computerWin") computerScore++;
    else if (result === "playerWin") humanScore++;
    console.log(`You've played ${step + 1} round(s)!`);
    console.log(
      `Player: ${humanScore} points. Computer: ${computerScore} points.`,
    );
    console.log("---------------------------------------------");
  }

  console.log("Game Over!");
  console.log(
    `Player: ${humanScore} points. Computer: ${computerScore} points.`,
  );
  if (humanScore === computerScore) console.log("It's a tie!");
  else
    humanScore > computerScore
      ? console.log("The Player wins!")
      : console.log("The Computer wins!");
}

// Does not take empty strings.
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
