class Grid {
    constructor(width, height, cellSize, mineCount) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.mineCount = mineCount;
        this.cells = [];
    }

    create() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.cells[y*this.width + x] = new Cell(x, y);
            }
        }
    }

    placeMines(cell) {
        let cells = this._getNonMines();
        cells = cells.filter((c) => c.x != cell.x || c.y != cell.y); // clicked cell can't be set as a mine

        for (let i = 0; i < this.mineCount; i++) {
            if (cells.length == 0) {
                break;
            }

            const cell = this._placeMine(cells);
            this._incrementMineCount(cell);
        }

        this.placedMines = true;
    }

    draw() {
        for (const cell of this.cells) {
            cell.draw(this.cellSize);
        }
    }

    revealCell(mx, my) {
        // get cell coordinates
        const x = Math.floor(mx / this.cellSize);
        const y = Math.floor(my / this.cellSize);

        if (this._areValidCoords(x, y)) {
            const cell = this._getCellAt(x, y);
            return this._revealCell(cell);
        }

        return false;
    }

    revealMines() {
        for (const cell of this.cells) {
            if (cell.isMine) {
                cell.reveal();
            }
        }
    }

    _revealCell(cell) {
        if (cell.isRevealed || cell.isFlagged) {
            return;
        }

        if (!this.placedMines) {
            this.placeMines(cell);
        }

        cell.reveal();

        if (cell.isMine) {
            return true;
        }

        if (cell.mineCount == 0) {
            const neighbors = this._getNeighbors(cell);
            for (const cell of neighbors) {
                if (!cell.isMine && !cell.isRevealed) {
                    this._revealCell(cell);
                }
            }
        }

        return false;
    }

    flagCell(mx, my) {
        // get cell coordinates
        const x = Math.floor(mx / this.cellSize);
        const y = Math.floor(my / this.cellSize);

        if (this._areValidCoords(x, y)) {
            const cell = this._getCellAt(x, y);
            if (!cell.isRevealed) {
                cell.toggleFlag();
            }
        }
    }

    allRevealed() {
        const cells = this._getNonRevealed();
        if (cells.length != this.mineCount) {
            return false;
        }

        for (const cell of cells) {
            if (cell.isBomb) {
                return false;
            }
        }

        return true;
    }

    _areValidCoords(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    _getNonMines() {
        let cells = [];
        for (const cell of this.cells) {
            if (!cell.isMine) {
                cells.push(cell);
            }
        }

        return cells;
    }

    _getNonRevealed() {
        let cells = [];
        for (const cell of this.cells) {
            if (!cell.isRevealed) {
                cells.push(cell);
            }
        }

        return cells;
    }

    _placeMine(cells) {
        const index = Math.floor(Math.random() * cells.length);
        const cell = cells[index];
        cell.setMine();
        cells.splice(index, 1);

        return cell;
    }

    _incrementMineCount(cell) {
        const neighbors = this._getNeighbors(cell);
        for (const cell of neighbors) {
            if (!cell.isMine) {
                cell.mineCount += 1;
            }
        }
    }

    _getNeighbors(cell) {
        let cells = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue; // skip self
                }

                const x = cell.x + i;
                const y = cell.y + j;

                if (this._areValidCoords(x, y)) {
                    cells.push(this._getCellAt(x, y));
                }
            }
        }

        return cells;
    }

    _getCellAt(x, y) {
        return this.cells[y*this.width + x];
    }
}