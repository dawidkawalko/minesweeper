// disable context menu (RMB flags a cell)
document.addEventListener('contextmenu', event => event.preventDefault());

// constants
const GRID_WIDTH = 10; // cells horizontally
const GRID_HEIGHT = 10; // cells vertically
const CELL_SIZE = 40; // px
const MINE_COUNT = 10;
const UI_HEIGHT = 100;

let grid;
let ui;
let timer;
let score = 0;
let gameOver = false;
let gameWon = false;

function resetGrid() {
    grid = new Grid(GRID_WIDTH, GRID_HEIGHT, CELL_SIZE, MINE_COUNT);
    grid.create();

    gameOver = false;
    gameWon = false;
}

function setup() {
    createCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE + UI_HEIGHT);
    resetGrid();
    ui = new Ui(width, height - UI_HEIGHT);
}

function draw() {
    background(255);
    
    grid.draw();

    if (gameOver) {
        ui.gameOverOverlay();
    } else if (gameWon) {
        ui.gameWonOverlay(score);
    }

    ui.showInstructions(5, height - UI_HEIGHT);
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
                if (!grid.placedMines) {
                    score = 0;
                    timer = setInterval(function() {
                        score += 1;
                    }, 1000);
                }

                const hitMine = grid.revealCell(mouseX, mouseY);
                if (hitMine) {
                    grid.revealMines();
                    gameOver = true;
                } else {
                    gameWon = grid.allRevealed();
                }

                if (gameOver || gameWon) {
                    clearInterval(timer);
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