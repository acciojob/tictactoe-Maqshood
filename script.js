const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const board = document.querySelector(".board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let players = {};
let moves = Array(9).fill(null);
let gameOver = false;

submitBtn.addEventListener("click", () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (!p1 || !p2) {
    alert("Please enter names for both players.");
    return;
  }

  players = { X: p1, O: p2 };
  board.style.display = "grid";
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent || gameOver) return;

    cell.textContent = currentPlayer;
    moves[index] = currentPlayer;

    if (checkWinner(currentPlayer)) {
      messageDiv.textContent = `${players[currentPlayer]} congratulations you won!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  });
});

function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => moves[index] === player)
  );
}