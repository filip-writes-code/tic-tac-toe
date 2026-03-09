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
        if (spot.getValue() === 0) {
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
    let value = 0;

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
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    const board = gameBoard();
    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    
    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn.`)
    }

    const playRound = (row, column) => {
        if(board.dropToken(row, column, activePlayer.token)) {
        switchActivePlayer();
        printNewRound();
        } else { 
            printNewRound()
        }
    }

    printNewRound();

    return {
        playRound
    }
}

const game = gameController();