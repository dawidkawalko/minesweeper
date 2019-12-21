// disable context menu (RMB flags a cell)
document.addEventListener('contextmenu', event => event.preventDefault());

// constants
const GRID_WIDTH = 10; // cells horizontally
const GRID_HEIGHT = 10; // cells vertically
const CELL_SIZE = 40; // px
const MINE_COUNT = 10;

let grid;
let gameOver = false;
let gameWon = false;

function resetGrid() {
    grid = new Grid(GRID_WIDTH, GRID_HEIGHT, CELL_SIZE, MINE_COUNT);
    grid.create();

    gameOver = false;
    gameWon = false;
}

function setup() {
    createCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
    resetGrid();
}

function printOverlay() {
    noStroke();
    fill('rgba(0, 0, 0, 0.8)');
    rect(0, 0, GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);
}

function printHeader(message) {
     textSize(40);
     fill(255);
     strokeWeight(5);
     text(message, GRID_WIDTH*CELL_SIZE / 2, GRID_HEIGHT*CELL_SIZE / 2);
}

function printPlayAgain() {
    textSize(20);
    fill(255);
    strokeWeight(3);
    text('(click to play again)', GRID_WIDTH*CELL_SIZE / 2, GRID_HEIGHT*CELL_SIZE / 2 + 30);
}

function draw() {
    background(255);
    
    grid.draw();

    if (gameOver || gameWon) {
        textAlign(CENTER, CENTER);
        stroke(0);

        printOverlay();
        printHeader(gameOver ? 'You lost' : 'You won');
        printPlayAgain();
    } 
}

function mousePressed() {
    switch (mouseButton) {
        case 'left':
            if (gameOver || gameWon) {
                resetGrid();
            } else {
                const hitMine = grid.revealCell(mouseX, mouseY);
                if (hitMine) {
                    grid.revealMines();
                    gameOver = true;
                } else {
                    gameWon = grid.allRevealed();
                }
            }

            break;

        case 'right':
            if (!gameOver && !gameWon) {
                grid.flagCell(mouseX, mouseY);
            }

            break;
    }
}