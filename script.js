const board = document.getElementById("board");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

function handleCellClick(index) {
  if (gameState[index] !== "" || getWinner()) return;

  gameState[index] = currentPlayer;
  renderBoard();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cellElement);
  });

  const winner = getWinner();
  if (winner) {
    alert(`Player ${winner} wins!`);
  }
}

function getWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }

  return null;
}

function resetGame() {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  renderBoard();
}

resetButton.addEventListener("click", resetGame);
renderBoard();
