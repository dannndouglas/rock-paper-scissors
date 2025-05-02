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
    console.log(randomNumber);
    return computerChoice;
}

//Get user choice
function getUserChoice() {
    let userChoice = (prompt("Rock, paper ou scissors?")).toLowerCase();
    return userChoice
}

//Count scores
let userScore = 0;
let computerScore = 0;

//Play rounds
let rounds = 0;

function playRound (userChoice, computerChoice) {
    
    let userWin = (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    );

    if (userChoice === computerChoice) {
        console.log('Tie!')
        return;
    } else if (userWin) {
        console.log('You win this round! ' + userChoice + ' beats ' + computerChoice + '.')
        userScore++;
    } else {
        console.log('You lose this round! ' + computerChoice + ' beats ' + userChoice + '.')
        computerScore++;
    }
}

//Play games
function playGames () {
    if (rounds < 5) {
        let userSelection = getUserChoice();
        let computerSelection = getComputerChoice();
        rounds++;
        playRound(userSelection, computerSelection);
        playGames();
    } else if (userScore === computerScore) {
        console.log("Game finished! Result: Tie.")
    } else {
        let winner = userScore > computerScore ? "You" : "The computer";
        console.log(winner + ' won this game!')
    }
}
playGames()