// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to handle a player's move
function makeMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

// Function to toggle between X and O
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            document.getElementById('result').innerText = `${currentPlayer} wins!`;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        document.getElementById('result').innerText = 'It\'s a draw!';
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('result').innerText = '';
    
    // Clear the game board
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerText = '');

    // Enable all cells
    cells.forEach((cell, index) => {
        cell.onclick = function() {
            makeMove(index);
        };
    });
}

// Dynamically generate the game board
const boardElement = document.getElementById('board');
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    cell.onclick = function() {
        makeMove(i);
    };
    boardElement.appendChild(cell);
}
