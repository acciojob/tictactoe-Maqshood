const submitBtn = document.getElementById('submit');
const gameTitle = document.getElementById('game-title');
const message = document.querySelector('.message');
const board = document.getElementById('board');

let players = [];
    let currentPlayer = 0;
    let gameActive = true;
    let moves = Array(9).fill(null);

    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

submitBtn.addEventListener("click", function(){
	const player1 = document.getElementById('player1').value.trim();
	const player2 = document.getElementById('player2').value.trim();

	if(!player1 || !player2){
		alert("Please Fill all Fields!");
		return;
	}
	  players = [player1, player2];
	  currentPlayer = 0;
	  gameActive = true;
	  moves = Array(9).fill(null);
	  board.innerHTML = "";
	  gameTitle.style.display = "block";
	  board.style.display = "grid";
	  message.textContent = ${players[currentPlayer]}, you're up;

	  for (let i = 0; i < 9; i++) {
		const cell = document.createElement("div");
		cell.classList.add("cell");
		cell.id = i + 1;
		cell.addEventListener("click", handleMove, { once: true });
		board.appendChild(cell);
	  }
	function handleMove(e) {
      if (!gameActive) return;

      const cell = e.target;
      const index = parseInt(cell.id) - 1;
      const symbol = currentPlayer === 0 ? "x" : "o";

      cell.textContent = symbol;
      moves[index] = symbol;

      if (checkWinner(symbol)) {
        message.textContent = ${players[currentPlayer]} congratulations you won!;
        gameActive = false;
        return;
      }

      if (!moves.includes(null)) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = 1 - currentPlayer;
      message.textContent = ${players[currentPlayer]}, you're up;
    }

    function checkWinner(sym) {
      return winCombos.some(combo =>
        combo.every(index => moves[index] === sym)
      );
    }
})