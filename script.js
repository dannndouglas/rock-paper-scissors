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

//Count scores
let userScoreDisplay = document.querySelector("#userScore");
let computerScoreDisplay = document.querySelector("#computerScore");
let userScore = 0;
let computerScore = 0;

//Play rounds
let playButtons = document.querySelector("#playButtons");
let resultsDisplay = document.querySelector("#results");
playButtons.addEventListener("click", (e) => {
    playRound(e.target.id, getComputerChoice());
})

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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
        let msg = userChoice + ' beats ' + computerChoice + '.' + ' You win this round!';
        resultsDisplay.textContent = capitalizeFirst(msg);
        userScore++;
    } else {
        let msg = computerChoice + ' beats ' + userChoice + '.' + ' You lose this round!';
        resultsDisplay.textContent = capitalizeFirst(msg);
        computerScore++;
    }
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;

    if (userScore === 5 || computerScore === 5) {
        setTimeout(() => {
            userScore > computerScore ?
            announceWinner("You") :
            announceWinner("The computer");
        }, 100);
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