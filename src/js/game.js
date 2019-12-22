// disable context menu (RMB flags a cell)
document.addEventListener('contextmenu', event => event.preventDefault());

// constants
let GRID_WIDTH = 10; // cells horizontally
let GRID_HEIGHT = 10; // cells vertically
const CELL_SIZE = 40; // px
const MINE_COUNT = 10;
const UI_HEIGHT = 180;
const GAME_LANGUAGE = 'PL';

let grid;
let ui;
let timer;
let score = 0;
let gameOver = false;
let gameWon = false;

let widthSlider;

function resetGame() {
    grid = new Grid(GRID_WIDTH, GRID_HEIGHT, CELL_SIZE, MINE_COUNT);
    grid.create();

    ui.width = width;
    ui.height = height - UI_HEIGHT;

    ui.widthSlider.position(5, height);
    ui.heightSlider.position(5, height + 30);
    ui.saveButton.position(5, height + 60);

    gameOver = false;
    gameWon = false;
}

function saveSettings() {
    GRID_WIDTH = ui.widthSlider.value();
    GRID_HEIGHT = ui.heightSlider.value();

    resizeCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE + UI_HEIGHT);
    resetGame();
}

function setup() {
    createCanvas(GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE + UI_HEIGHT);

    ui = new Ui(width, height - UI_HEIGHT, GAME_LANGUAGE);

    ui.widthSlider = createSlider(5, 20, 10, 1);
    ui.heightSlider = createSlider(5, 20, 10, 1);
    ui.saveButton = createButton(ui.strings['SETTINGS_SAVE']);
    ui.saveButton.mousePressed(saveSettings);

    resetGame();
}

function draw() {
    background(255);
    
    grid.draw();

    if (gameOver) {
        ui.gameOverOverlay();
    } else if (gameWon) {
        ui.gameWonOverlay(score);
    }

    ui.showCurrentScore(score);
    ui.showGameInfo(GRID_WIDTH, GRID_HEIGHT, MINE_COUNT);
    ui.showInstructions();
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        resetGame();
    }
}

function mousePressed() {
    if (mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY > (height - UI_HEIGHT)) {
        return;
    }
    
    switch (mouseButton) {
        case 'left':
            if (gameOver || gameWon) {
                resetGame();
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