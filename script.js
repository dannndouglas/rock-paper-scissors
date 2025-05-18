// Language and text resources
const resources = {
    en: {
        title: "Rock Paper Scissors",
        you: "You",
        computer: "Computer",
        rock: "Rock",
        paper: "Paper",
        scissors: "Scissors",
        tie: "Tie!",
        win: (user, computer) => `${user} beats ${computer}.<br>You win this round!`,
        lose: (computer, user) => `${computer} beats ${user}.<br>You lose this round!`,
        alert: winner => `${winner} win this game`,
    },
    pt: {
        title: "Pedra Papel Tesoura",
        you: "Você",
        computer: "Computador",
        rock: "Pedra",
        paper: "Papel",
        scissors: "Tesoura",
        tie: "Empate!",
        win: (user, computer) => `${user} vence ${computer}.<br>Você venceu esta rodada!`,
        lose: (computer, user) => `${computer} vence ${user}.<br>Você perdeu esta rodada!`,
        alert: winner => `${winner} venceu o jogo`,
    }
};

let currentLang = 'en';

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random()*3);
    if (randomNumber == 0) return 'rock';
    if (randomNumber == 1) return 'paper';
    return 'scissors';
}

let userScoreDisplay = document.querySelector("#userScore");
let computerScoreDisplay = document.querySelector("#computerScore");
let userScore = 0;
let computerScore = 0;

let playButtons = document.querySelector("#playButtons");
let resultsDisplay = document.querySelector("#results");

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fix: ensure event delegation works for inner span clicks
playButtons.addEventListener("click", (e) => {
    let btn = e.target.closest("button");
    if (!btn) return;
    if (!['rock','paper','scissors'].includes(btn.id)) return;
    playRound(btn.id, getComputerChoice());
});

function playRound (userChoice, computerChoice) {
    resultsDisplay.textContent = '';
    let userWin = (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    );

    const res = resources[currentLang];
    const userLabel = res[userChoice];
    const computerLabel = res[computerChoice];

    if (userChoice === computerChoice) {
        resultsDisplay.textContent = res.tie;
        return;
    } else if (userWin) {
        let msg = res.win(userLabel, computerLabel);
        resultsDisplay.innerHTML = capitalizeFirst(msg);
        userScore++;
    } else {
        let msg = res.lose(computerLabel, userLabel);
        resultsDisplay.innerHTML = capitalizeFirst(msg);
        computerScore++;
    }
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;

    if (userScore === 5 || computerScore === 5) {
        setTimeout(() => {
            userScore > computerScore ?
            announceWinner(res.you) :
            announceWinner(res.computer);
        }, 100);
    }
}

function announceWinner (winner) {
    resultsDisplay.textContent = "";
    alert(resources[currentLang].alert(winner));
    userScore = 0;
    computerScore = 0;
    userScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;
}

// Language toggle logic
const langToggle = document.getElementById('langToggle');
const flagEn = document.getElementById('flag-en');
const flagPt = document.getElementById('flag-pt');
const gameTitle = document.getElementById('gameTitle');
const labelUser = document.getElementById('labelUser');
const labelComputer = document.getElementById('labelComputer');
const btnRock = document.getElementById('btnRock');
const btnPaper = document.getElementById('btnPaper');
const btnScissors = document.getElementById('btnScissors');

function updateLanguageUI() {
    const res = resources[currentLang];
    gameTitle.textContent = res.title;
    labelUser.textContent = res.you;
    labelComputer.textContent = res.computer;
    btnRock.textContent = res.rock;
    btnPaper.textContent = res.paper;
    btnScissors.textContent = res.scissors;
    // Update flag
    if (currentLang === 'en') {
        flagEn.style.display = '';
        flagPt.style.display = 'none';
    } else {
        flagEn.style.display = 'none';
        flagPt.style.display = '';
    }
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'pt' : 'en';
    updateLanguageUI();
});

// On load
updateLanguageUI();