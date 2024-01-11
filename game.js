document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('reset');
    const cells = [];

    let currentPlayer = 'X';
    let winner = null;



    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
        cells.push(cell);
    }

    // Handle cell click event
    function handleCellClick(event) {
        const clickedCell = event.target;
        const index = clickedCell.dataset.index;

        if (cells[index].textContent === '' && !winner) {
            cells[index].style.backgroundImage = `url('${currentPlayer}.png')`;
            checkWinner();   
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            
        }
    }

    // Check for a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a].style.backgroundImage !== '' &&
                cells[a].style.backgroundImage === cells[b].style.backgroundImage &&
                cells[a].style.backgroundImage === cells[c].style.backgroundImage) {
                winner = currentPlayer;
                result.textContent = `Player ${winner} wins👍`;
                return;
            }
        }

        if (isBoardFull()) {
            result.textContent = "It's a draw👌";
            return;
        }
    }

    // Check if the board is full
    function isBoardFull() {
        return cells.every(cell => cell.style.backgroundImage !== '');
    }

    // Reset the game
    resetButton.addEventListener('click', resetGame);

    // Reset game function
    function resetGame() {
        cells.forEach(cell => {
            cell.style.backgroundImage = '';
        });
        result.textContent = '';
        winner = null;
        currentPlayer = 'X';
    }   

 
});
