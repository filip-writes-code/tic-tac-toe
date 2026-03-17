function gameBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.table(boardWithValues);
    }

    const dropToken = (row, column, player) => {
        const spot = board[row][column];
        //check if the spot hasn't been played before
        if (spot.getValue() === '') {
            spot.changeValue(player);
            return true;
        } else {
            return(false);
        }
    }

    return {
        getBoard,
        printBoard,
        dropToken
    }
}

function cell() {
    let value = '';

    const changeValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        changeValue,
        getValue
    }
}

function gameController (
    playerOneName = 'Player 1',
    playerTwoName = 'Player 2'
) {
    const players = [
        {
            name: playerOneName,
            token: 'X'
        },
        {
            name: playerTwoName,
            token: 'O'
        }
    ];
    
    const board = gameBoard();
    let activePlayer = players[0];

    const getActivePlayer = () => {
        return activePlayer;
    }

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    
    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn.`)
    }

    const scanForWinner = () => {
        const allEqual = arr => arr.every(v => v.getValue() !=='' && v.getValue() === arr[0].getValue() )
        const boardToScan = board.getBoard();
            if (allEqual(boardToScan[0])) {return boardToScan[0][0].getValue()};
            if (allEqual(boardToScan[1])) {return boardToScan[1][0].getValue()}
            if (allEqual(boardToScan[2])) {return boardToScan[2][0].getValue()}
            if (allEqual([boardToScan[0][0], boardToScan[1][0], boardToScan[2][0]])) {return boardToScan[0][0].getValue()}
            if (allEqual([boardToScan[0][1], boardToScan[1][1], boardToScan[2][1]])) {return boardToScan[0][1].getValue()}
            if (allEqual([boardToScan[0][2], boardToScan[1][2], boardToScan[2][2]])) {return boardToScan[0][2].getValue()}
            if (allEqual([boardToScan[0][0], boardToScan[1][1], boardToScan[2][2]])) {return boardToScan[0][0].getValue()}
            if (allEqual([boardToScan[0][2], boardToScan[1][1], boardToScan[2][0]])) {return boardToScan[0][2].getValue()}
    }

    const isTied = () => {
        const boardToCheck = board.getBoard();
        const arrayOfCells = [];
        boardToCheck.forEach(row => {
            row.forEach(cell => {
                arrayOfCells.push(cell);
            })
        })
        if (arrayOfCells.every(cell => cell.getValue() !== '')) {
            return true
        } else {
            return false
        }
    }

    const returnPlayerByToken = (searchToken) => {
        const playerObject = players.filter((player) => searchToken === player.token)[0];
        return playerObject;
    }

    const playRound = (row, column) => {
        if(board.dropToken(row, column, activePlayer.token)) {
        switchActivePlayer();
        printNewRound();
        //check for winner
        if (scanForWinner()) {
            console.log('Winner is: ' + returnPlayerByToken(scanForWinner()).name)
        }
        } else { 
            printNewRound()
        }
        //check if it's tied
        if (isTied()) {
            console.log("It's a tie!")
        }
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard : board.getBoard
    }
}

function screenController () {
    const game = gameController();
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        //start fresh
        boardDiv.textContent = '';
        //get the latest state of the board and active player
        const screenBoard = game.getBoard();
        const activePlayer = game.getActivePlayer();
        //print the board
        screenBoard.forEach((row, row_index) => {
            row.forEach((cell, column_index) => {
                const cellElement = document.createElement('button');
                cellElement.classList.add('cell');
                cellElement.textContent = cell.getValue();
                cellElement.dataset.row = row_index;
                cellElement.dataset.column = column_index;
                boardDiv.appendChild(cellElement);
            })
            })
    }

    function clickHandler(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    boardDiv.addEventListener('click', clickHandler);

updateScreen();

}
screenController();