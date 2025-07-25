 
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
player2 = document.getElementById("player2").value;


  if (player1 && player2) {
    document.getElementById("player-form").style.display = "none";
    document.getElementById("game-board").style.display = "block";
    document.querySelector(".message").innerText = `${player1}, you're up`;
  }
});

document.querySelectorAll(".cell").forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.innerText !== "" || !gameActive) return;

    cell.innerText = currentPlayer;
    board[index] = currentPlayer;

    if (checkWin()) {
      const winner = currentPlayer === "X" ? player1 : player2;
      document.querySelector(".message").innerText = `${winner}, congratulations you won!`;
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      document.querySelector(".message").innerText = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      const nextPlayer = currentPlayer === "X" ? player1 : player2;
      document.querySelector(".message").innerText = `${nextPlayer}, you're up`;
    }
  });
});

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],  
    [0,3,6], [1,4,7], [2,5,8],  
    [0,4,8], [2,4,6]            
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
