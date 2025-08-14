var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;
var currColumns;

var rows = 6;
var columns = 7;

window.onload = function () {
    setGame();
};

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(null);
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);
    let r = currColumns[c];
    if (r < 0) return;

    board[r][c] = currPlayer;
    let tile = document.getElementById(r + "-" + c);
    tile.classList.add(currPlayer === playerRed ? "red-piece" : "yellow-piece");

    if (checkWinner(r, c)) {
        setWinner(r, c);
        return;
    }

    currPlayer = currPlayer === playerRed ? playerYellow : playerRed;
    currColumns[c] = r - 1;
}

function checkWinner(r, c) {
    let directions = [
        [[0, 1], [0, -1]],      // Horizontal
        [[1, 0], [-1, 0]],      // Vertical
        [[1, 1], [-1, -1]],     // Diagonal down-right
        [[1, -1], [-1, 1]]      // Diagonal down-left
    ];

    for (let direction of directions) {
        let count = 1;

        for (let [dr, dc] of direction) {
            let row = r + dr;
            let col = c + dc;

            while (
                row >= 0 && row < rows &&
                col >= 0 && col < columns &&
                board[row][col] === currPlayer
            ) {
                count++;
                row += dr;
                col += dc;
            }
        }

        if (count >= 4) return true;
    }

    return false;
}

function setWinner(r, c) {
    document.getElementById("winner").innerText =
        board[r][c] === playerRed ? "Red Wins!" : "Yellow Wins!";
    gameOver = true;
}

function resetGame() {
    location.reload();
}
