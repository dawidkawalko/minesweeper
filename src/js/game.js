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
    createCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE + 100);
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
     textAlign(CENTER, CENTER);
     text(message, GRID_WIDTH*CELL_SIZE / 2, GRID_HEIGHT*CELL_SIZE / 2);
}

function printPlayAgain() {
    textSize(20);
    fill(255);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    text('(click to play again)', GRID_WIDTH*CELL_SIZE / 2, GRID_HEIGHT*CELL_SIZE / 2 + 30);
}

function printInstructions() {
    textSize(18);
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    text('Instructions:', 5, GRID_HEIGHT*CELL_SIZE + 10);
    text('[LMB] - reveal cell', 5, GRID_HEIGHT*CELL_SIZE + 30);
    text('[RMB] - place/remove flag', 5, GRID_HEIGHT*CELL_SIZE + 50);
    text('[R] - reset grid', 5, GRID_HEIGHT*CELL_SIZE + 70);
}

function draw() {
    background(255);
    
    grid.draw();

    if (gameOver || gameWon) {
        stroke(0);
        printOverlay();
        printHeader(gameOver ? 'You lost' : 'You won');
        printPlayAgain();
    } 

    printInstructions();
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        resetGrid();
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