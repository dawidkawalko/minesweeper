class Ui {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // overlay strings
        this.gameOverString = 'You hit a mine :(';
        this.gameWonString = 'You won, great job';
        this.playAgainString = '(click to play again)';
        this.scoreString = 'Score: ';

        // game info strings
        this.gridSizeString = 'Grid size: ';
        this.mineCountString = 'Mine count: ';

        // instruction strings
        this.instructionsHeaderString = 'Instructions:';
        this.instructionsLmbString = '[LMB] - reveal cell';
        this.instructionsRmbString = '[RMB] - place/remove flag';
        this.instructionsResetString = '[R] - reset grid';
    }

    gameOverOverlay() {
        this._showScreenOverlay();
        this._showMainLine(this.gameOverString);
        this._showUnderLine(this.playAgainString, 30);
    }

    gameWonOverlay(score) {
        this._showScreenOverlay();
        this._showMainLine(this.gameWonString);
        this._showScore(score);
        this._showUnderLine(this.playAgainString, 60);
    }

    _showScreenOverlay() {
        noStroke();
        fill('rgba(0, 0, 0, 0.8)');
        rect(0, 0, this.width, this.height);
    }

    _showMainLine(string) {
        textSize(40);
        fill(255);
        strokeWeight(5);
        textAlign(CENTER, CENTER);
        text(string, this.width/2, this.height/2);
    }

    _showUnderLine(string, offset) {
        textSize(20);
        fill(255);
        strokeWeight(3);
        textAlign(CENTER, CENTER);
        text(string, this.width/2, this.height/2 + offset);
    }

    _showScore(score) {
        textSize(20);
        fill(255);
        strokeWeight(5);
        textAlign(CENTER, CENTER);
        text(this.scoreString + score, this.width/2, this.height/2 + 30);
    }

    showInstructions() {
        textSize(18);
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        text(this.instructionsHeaderString, 5, this.height + 90);
        text(this.instructionsLmbString, 5, this.height + 110);
        text(this.instructionsRmbString, 5, this.height + 130);
        text(this.instructionsResetString, 5, this.height + 150);
    }

    showCurrentScore(score) {
        textSize(18);
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        text(this.scoreString + score, 5, this.height + 10);
    }

    showGameInfo(gridWidth, gridHeight, mineCount) {
        textSize(18);
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        text(this.gridSizeString + gridWidth + 'x' + gridHeight, 5, this.height + 30);
        text(this.mineCountString + mineCount, 5, this.height + 50);
    }
}