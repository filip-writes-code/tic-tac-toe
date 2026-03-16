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

    const scanForWinner = () => {
        const allEqual = arr => arr.every(v => v.getValue() !==0 && v.getValue() === arr[0].getValue() )
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

    const returnPlayerByToken = (searchToken) => {
        const playerObject = players.filter((player) => searchToken === player.token)[0];
        return playerObject;
    }

    const playRound = (row, column) => {
        if(board.dropToken(row, column, activePlayer.token)) {
        switchActivePlayer();
        printNewRound();
        if (scanForWinner()) {
            console.log('Winner is: ' + returnPlayerByToken(scanForWinner()).name)
        }
        } else { 
            printNewRound()
        }
    }

    printNewRound();

    return {
        playRound,
        scanForWinner
    }
}

const game = gameController();
game.playRound(0,2) //x
game.playRound(0,1) //o
game.playRound(1,1) //x
game.playRound(2,1) //o
game.playRound(2,0) //x