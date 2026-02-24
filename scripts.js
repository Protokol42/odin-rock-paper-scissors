console.log("Hello");

console.log(getComputerChoice());

console.log("The player chooses: " + getHumanChoice());

function getComputerChoice() {
  const randomized = Math.random();
  if (randomized <= 0.33) return "rock";
  return randomized > 0.66 ? "scissors" : "paper";
}

function getHumanChoice() {
  return prompt("Choose rock, paper or scissors!");
}
