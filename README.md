# odin-rock-paper-scissors

This project is a console based Rock Paper Scissors game built as part of The Odin Project curriculum.

This is console based! Remember to click F12 and then ESC to access the console before playing!

## Core Concepts Practiced

### JavaScript Foundations

- **Score Persistence:** Managing `humanScore` and `computerScore` within the `playGame` function to track progress across multiple rounds.
- **Functional Decomposition:** Breaking the game into specialized functions like `playRound` and `handleRoundWinner` for better organization.
- **Value Returns:** Using return statements to pass the result of a round back to the main game function for score processing.

### Logic and Control Flow

- **Iterative Execution:** Using a `for` loop to ensure the game runs for exactly five rounds before declaring a final winner.
- **Decision Logic:** Implementing `switch` statements to compare choices and determine the winner of each individual round.
- **Automated Opponent:** Using `Math.random()` with specific range thresholds to simulate a randomized computer choice.

### User Experience and Input

- **Input Cleaning:** Utilizing `.trim()` and `.toLowerCase()` to handle user input and prevent case sensitive mismatches or extra spaces.
- **Data Presentation:** Using template literals and a capitalization helper function to display scores and round outcomes in a clean format.

## Technologies Used

- **HTML5:** Providing the basic document structure to load and execute the logic script.
- **JavaScript:** Powering all game mechanics, randomization, and state management.
