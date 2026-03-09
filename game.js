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
        } else {
            return('Illegal move');
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


const game = gameBoard();