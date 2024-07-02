/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/

let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let winner = false;
let tie = false;
let WinnerName;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

const render = () => {
    updateBoard();
    updateMessage();
};

const updateBoard = () => {
    board.forEach((x, index) => {
        squareEls[index].innerText = board[index];
    });
};

const updateMessage = () => {
    if (winner == false && tie == true) {
        messageEl.textContent = 'Tie!!';
    } else if (winner == false && tie == false) {
        messageEl.textContent = `${turn} turn`;
    } else {
        messageEl.textContent = `The winner is ${WinnerName} !!`;
    }
};

const handleClick = (event) => {
    squareIndex = event.target.id;
    squareText = squareEls[squareIndex].innerText;

    if (squareText == '' && winner != true) {
        placePiece(squareIndex);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        updateMessage();
    }
};

const placePiece = (squareIndex) => {
    squareEls[squareIndex].innerText = turn;
    board[squareIndex] = turn;
    console.log(board);
};

const checkForWinner = () => {
    winningCombos.forEach((x) => {
        const [A, B, C] = x;
        if (board[A] != '' && board[A] == board[B] && board[B] == board[C]) {
            WinnerName = board[A];
            winner = true;
        }
    });
};

const checkForTie = () => {
    board.forEach(x => {
        if (board.includes(''))
            tie = false;
        else
            tie = true
    });
};

const switchPlayerTurn = () => {
    if (turn == 'X') {
        turn = 'O';
    } else if (turn == 'O') {
        turn = 'X';
    }
};

const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    winner = false;
    tie = false;
    render();
};
init();

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((x) => {
    x.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);