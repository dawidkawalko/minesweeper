class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isMine = false;
        this.isRevealed = false;
        this.isFlagged = false;
        this.mineCount = 0;
    }

    setMine() {
        this.isMine = true;
        this.mineCount = 0;
    }

    toggleFlag() {
        this.isFlagged = !this.isFlagged;
    }

    reveal() {
        this.isRevealed = true;
    }

    draw(size) {
        if (this.isRevealed) {
            fill(200);

            if (this.isMine) {
                fill(200, 0, 0);
            }
        } else {
            fill(255);
        }

        if (this.isFlagged) {
            fill(0, 200, 0);
        }

        stroke(0);
        strokeWeight(1);
        rect(this.x * size, this.y * size, size, size);

        if (this.isRevealed && this.mineCount > 0) {
            noStroke();
            textSize(20);
            fill(0);
            textAlign(CENTER, CENTER);
            text(this.mineCount, this.x*size + size/2, this.y*size + size/2);
        }
    }
}