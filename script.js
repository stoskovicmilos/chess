const boardElement = document.getElementById("board");
const turnText = document.getElementById("turn");

let turn = "white";
let selectedPiece = null;

const pieces = {
    wp: "♙", wr: "♖", wn: "♘", wb: "♗", wq: "♕", wk: "♔",
    bp: "♟", br: "♜", bn: "♞", bb: "♝", bq: "♛", bk: "♚"
};

let board = [
    ["br","bn","bb","bq","bk","bb","bn","br"],
    ["bp","bp","bp","bp","bp","bp","bp","bp"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["wp","wp","wp","wp","wp","wp","wp","wp"],
    ["wr","wn","wb","wq","wk","wb","wn","wr"]
];

function drawBoard() {
    boardElement.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");

            if ((row + col) % 2 === 0) {
                square.classList.add("white");
            } else {
                square.classList.add("black");
            }

            square.dataset.row = row;
            square.dataset.col = col;

            const piece = board[row][col];
            if (piece !== "") {
                square.textContent = pieces[piece];
            }

            if (
                selectedPiece &&
                selectedPiece.row === row &&
                selectedPiece.col === col
            ) {
                square.classList.add("selected");
            }

            square.addEventListener("click", () => onSquareClick(row, col));
            boardElement.appendChild(square);
        }
    }
}

function onSquareClick(row, col) {
    const piece = board[row][col];

    if (selectedPiece) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        selectedPiece = null;
    } else {
        if (piece !== "" && piece[0] === turn[0]) {
            selectedPiece = { row, col };
        }
    }

    drawBoard();
}

function movePiece(fromRow, fromCol, toRow, toCol) {
    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = "";

    turn = turn === "white" ? "black" : "white";
    turnText.textContent = turn === "white" ? "Beli" : "Crni";
}

drawBoard();
