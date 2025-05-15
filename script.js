//Get computer choice
function getComputerChoice() {
    let randomNumber = Math.floor(Math.random()*3);
    let computerChoice;
    if (randomNumber == 0) {
        computerChoice = "rock";
    } else if (randomNumber == 1) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }
    return computerChoice;
}

//Get user choice
function getUserChoice() {
    let userChoice = (prompt("Rock, paper ou scissors?")).toLowerCase();
    return userChoice
}

//Count scores
let userScoreDisplay = document.querySelector("#userScore");
let computerScoreDisplay = document.querySelector("#computerScore");
let userScore = 0;
let computerScore = 0;

//Play rounds
let rounds = 0;
let playButtons = document.querySelector("#playButtons");
let resultsDisplay = document.querySelector("#results");
playButtons.addEventListener("click", (e) => {
    playRound(e.target.id, getComputerChoice());
})

function playRound (userChoice, computerChoice) {
    resultsDisplay.textContent = ''
    let userWin = (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    );

    if (userChoice === computerChoice) {
        resultsDisplay.textContent = 'Tie!';
        return;
    } else if (userWin) {
        resultsDisplay.textContent = userChoice + ' beats ' + computerChoice + '.' + 'You win this round!';
        userScore++;
    } else {
        resultsDisplay.textContent = computerChoice + ' beats ' + userChoice + '.' + 'You lose this round!';
        computerScore++;
    }
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;

    if (userScore === 5 || computerScore === 5) {
        userScore > computerScore ?
        announceWinner("You") :
        announceWinner("The computer");
    }
}

//Check announce winner
function announceWinner (winner) {
    resultsDisplay.textContent = "";
    alert(winner + " win this game");
    userScore = 0;
    computerScore = 0;
    userScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;
}