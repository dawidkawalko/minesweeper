class Ui {
    constructor(width, height, language) {
        this.width = width;
        this.height = height;

        switch (language) {
            case 'PL':
                this.strings = Strings.PL;
                break;

            case 'EN':
            default:
                this.strings = Strings.EN;
                break;
        }
    }

    gameOverOverlay() {
        this._showScreenOverlay();
        this._showMainLine(this.strings['GAME_OVER']);
        this._showUnderLine(this.strings['PLAY_AGAIN'], 30);
    }

    gameWonOverlay(score) {
        this._showScreenOverlay();
        this._showMainLine(this.strings['GAME_WON']);
        this._showScore(score);
        this._showUnderLine(this.strings['PLAY_AGAIN'], 60);
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
        text(this.strings['SCORE'] + score, this.width/2, this.height/2 + 30);
    }

    showInstructions() {
        textSize(18);
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        text(this.strings['INSTRUCTIONS_HEADER'], 5, this.height + 90);
        text(this.strings['INSTRUCTIONS_LMB'], 5, this.height + 110);
        text(this.strings['INSTRUCTIONS_RMB'], 5, this.height + 130);
        text(this.strings['INSTRUCTIONS_RESET'], 5, this.height + 150);
    }

    showCurrentScore(score) {
        textSize(18);
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        text(this.strings['SCORE'] + score, 5, this.height + 10);
    }

    showGameInfo(gridWidth, gridHeight, mineCount) {
        textSize(18);
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        text(this.strings['GRID_SIZE'] + gridWidth + 'x' + gridHeight, 5, this.height + 30);
        text(this.strings['MINE_COUNT'] + mineCount, 5, this.height + 50);
    }
}