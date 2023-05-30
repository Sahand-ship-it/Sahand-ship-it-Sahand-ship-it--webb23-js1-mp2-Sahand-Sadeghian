// Array för spelhistorik 

let gameHistory = [];


const startGameButton = document.querySelector(`#startGame`);

// Func spelhistorik spara 

function updateGameHistory(playerSelection, computerSelection, result) {
  gameHistory.push({
    player: playerSelection,
    computer: computerSelection,
    result: result
  });

  let historyList = "<ul>";
  for (let i = 0; i < gameHistory.length; i++) {
    const round = gameHistory[i];
    historyList += `<li>Runda ${i + 1}: Spelare: ${round.player}, Datorn: ${round.computer}, Resultat: ${round.result}</li>`;
  }
  historyList += "</ul>";

  document.getElementById('gameHistory').innerHTML = historyList;
}

startGameButton.addEventListener(`click`, showName);

function showName(event) {
  event.preventDefault();

    // Hämta namn
  
    const playerName = event.target.form.playerName.value;
  
    // Visa spelarens namn i spelhistoriken
    const gameHistory = document.getElementById('gameHistory');
    gameHistory.innerText = `Spelare: ` + playerName;
  
      
    const choices = document.getElementById('choices').getElementsByTagName('img');
    for (let i = 0; i < choices.length; i++) {
      choices[i].removeAttribute('disabled');
    }
  }
  
  // Poängen

let playerScore = 0;
let computerScore = 0;

// Datorns val

function generateComputerChoice() {
  const choices = ['rock', 'scissors', 'paper'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Func för spelarens val

function playerChoice(playerSelection) {
  const computerSelection = generateComputerChoice();

  // Spelaren + datorns val

  document.getElementById('result').innerHTML = `Spelare: ${playerSelection}<br>Datorn: ${computerSelection}`;

  // Jämförelse av val och uppdatering av poängen

  if (playerSelection === computerSelection) {
    document.getElementById('result').innerHTML += "<br>Oavgjort!";
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'scissors' && computerSelection === 'paper') ||
    (playerSelection === 'paper' && computerSelection === 'rock')
  ) {
    document.getElementById('result').innerHTML += "<br>Du vinner!";
    playerScore++;
  } else {
    document.getElementById('result').innerHTML += "<br>Datorn vinner!";
    computerScore++;
  }

  // Uppdatera poäng

  document.getElementById('score').innerHTML = `Poäng - Spelare: ${playerScore} Datorn: ${computerScore}`;

  // nått 3 poäng = vinst 

  if (playerScore === 3) {
    document.getElementById('result').innerHTML += "<br>Du vinner spelet!";
    disableChoices();
  } else if (computerScore === 3) {
    document.getElementById('result').innerHTML += "<br>Datorn vinner spelet!";
    disableChoices();
  }
}


function disableChoices() {
  const choices = document.getElementById('choices').getElementsByTagName('img');
  for (let i = 0; i < choices.length; i++) {
    choices[i].setAttribute('disabled', 'disabled');
  }
}

// Starta om spelet

function resetGame() {
  
  // Återställning av poäng och resultat

  playerScore = 0;
  computerScore = 0;
  document.getElementById('score').innerHTML = '';
  document.getElementById('result').innerHTML = '';

  // Aktivera val

  const choices = document.getElementById('choices').getElementsByTagName('img');
  for (let i = 0; i < choices.length; i++) {
    choices[i].removeAttribute('disabled');
  }
}
