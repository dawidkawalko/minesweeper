class Ui {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // overlay strings
        this.gameOverString = 'You hit a mine :(';
        this.gameWonString = 'You won, great job';
        this.playAgainString = '(click to play again)';
        this.scoreString = 'Score: ';

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

    showInstructions(x, y) {
        textSize(18);
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        text(this.instructionsHeaderString, x, y + 10);
        text(this.instructionsLmbString, x, y + 30);
        text(this.instructionsRmbString, x, y + 50);
        text(this.instructionsResetString, x, y + 70);
    }
}