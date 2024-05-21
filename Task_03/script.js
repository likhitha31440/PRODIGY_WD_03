let gameBoard = [];
let currentPlayer = "X";
let gameOver = false;
let gameMode = "pvp"; 

const xTurnIndicator = document.getElementById("x-turn");
const oTurnIndicator = document.getElementById("o-turn");
const gameModeSelector = document.getElementById("game-mode");

function updateTurnIndicator() {
  if (currentPlayer === "X") {
    xTurnIndicator.classList.add("highlight");
    oTurnIndicator.classList.remove("highlight");
  } else {
    xTurnIndicator.classList.remove("highlight");
    oTurnIndicator.classList.add("highlight");
  }
}

function initGame() {
  gameBoard = [];
  for (let i = 0; i < 9; i++) {
    gameBoard.push("");
    document.getElementById(`cell-${i}`).addEventListener("click", handleCellClick);
  }
  updateTurnIndicator(); 
  gameOver = false;
  currentPlayer = "X";
}

initGame(); 

function handleCellClick(event) {
  if (gameOver) return;
  const cellIndex = event.target.id.split("-")[1];
  if (gameBoard[cellIndex] === "") {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkForWin();
    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateTurnIndicator(); 
      if (gameMode === "pva" && currentPlayer === "O") {
        handleAiMove();
      }
    }
  }
}


function handleAiMove() {
  setTimeout(() => {
    let emptyCells = gameBoard.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameBoard[move] = "O";
    document.getElementById(`cell-${move}`).textContent = "O";
    checkForWin();
    if (!gameOver) {
      currentPlayer = "X";
      updateTurnIndicator();
    }
  }, 500); 
}


function checkForWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    if (
      gameBoard[condition[0]] === gameBoard[condition[1]] &&
      gameBoard[condition[1]] === gameBoard[condition[2]] &&
      gameBoard[condition[0]] !== ""
    ) {
      alert(`Player ${gameBoard[condition[0]]} wins!`);
      gameOver = true;
      return;
    }
  }
  if (!gameBoard.includes("")) {
    alert("It's a draw!");
    gameOver = true;
  }
}


document.getElementById("reset-button").addEventListener("click", resetGame);

function resetGame() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).textContent = "";
  }
  initGame();
}


gameModeSelector.addEventListener("change", (event) => {
  gameMode = event.target.value;
  resetGame();
});
