let currentPlayer = 'X';
let gameOver = false;

function makeMove(cellIndex) {
    const cell = document.getElementsByClassName('cell')[cellIndex];

    if (!cell.innerHTML && !gameOver) {
        cell.innerHTML = currentPlayer;
        cell.style.backgroundColor = "#fff";
        
        cell.classList.add('selected');

        if (checkWin()) {
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (isBoardFull()) {
            document.getElementById('message').innerText = "It's a draw!";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        // Sıranın kimde olduğunu güncelle
        updatePlayerTurn();
    }
}


function checkWin() {
    const cells = document.getElementsByClassName('cell');
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        if (!cell.innerHTML) {
            return false;
        }
    }
    return true;
}   
function updatePlayerTurn() {
    const playerTurnElement = document.getElementById('player-turn');
    playerTurnElement.innerText = `Player's Turn: ${currentPlayer}`;
}

function resetBoard() {
    const cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        cell.innerHTML = '';
        cell.style.backgroundColor = "#f0f0f0";
        // Tüm kutulardan "selected" sınıfını kaldır
        cell.classList.remove('selected');
    }
    document.getElementById('message').innerText = '';
    currentPlayer = 'X';
    gameOver = false;

    // Sıranın kimde olduğunu sıfırla
    updatePlayerTurn();
}