class Ui {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // overlay strings
        this.gameOverString = 'You hit a mine :(';
        this.gameWonString = 'You won, great job';
        this.playAgainString = '(click to play again)';

        // instruction strings
        this.instructionsHeaderString = 'Instructions:';
        this.instructionsLmbString = '[LMB] - reveal cell';
        this.instructionsRmbString = '[RMB] - place/remove flag';
        this.instructionsResetString = '[R] - reset grid';
    }

    gameOverOverlay() {
        this.showScreenOverlay();
        this.showMainLine(this.gameOverString)
        this.showUnderLine(this.playAgainString);
    }

    gameWonOverlay() {
        this.showScreenOverlay();
        this.showMainLine(this.gameWonString)
        this.showUnderLine(this.playAgainString);
    }

    showScreenOverlay() {
        noStroke();
        fill('rgba(0, 0, 0, 0.8)');
        rect(0, 0, this.width, this.height);
    }

    showMainLine(string) {
        textSize(40);
        fill(255);
        strokeWeight(5);
        textAlign(CENTER, CENTER);
        text(string, this.width/2, this.height/2);
    }

    showUnderLine(string) {
        textSize(20);
        fill(255);
        strokeWeight(3);
        textAlign(CENTER, CENTER);
        text(string, this.width/2, this.height/2 + 30);
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