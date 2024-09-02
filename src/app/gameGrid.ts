interface Cell {
    rowInd: number;
    colInd: number; 
    value: number; 
    isClickable: boolean; 
}

export class smallGrid {
    private rowInd: number;
    private colInd: number; 
    public cells: Cell[]; 
    private overallValue: number;

    public constructor(myRowInd: number, myColInd: number) {
        this.rowInd = myRowInd; 
        this.colInd = myColInd;
        this.overallValue = -1; 

        this.cells = []
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                this.cells.push({
                    rowInd: i, 
                    colInd: j, 
                    value: -1, 
                    isClickable: true
                }); 
            }
        }
    }
    
    public getRowInd(): number {
        return this.rowInd; 
    }

    public getColInd(): number {
        return this.colInd; 
    }

    public getValue(): number {
        return this.overallValue; 
    }

    public setValue(myValue: number): void {
        this.overallValue = myValue
    }

    public isCellClickable(index: number): boolean {
        return this.cells[index].isClickable; 
    }

    public toggleCellClickable(index: number, newState: boolean): void {
        this.cells[index].isClickable = newState;
    }

    public getCellValue(index: number) {
        return this.cells[index].value; 
    }

    public displayCellValue(index: number): string {
        switch (this.cells[index].value) {
            case 1: 
                return "x"; 
            case 2: 
                return "o"; 
            default: 
                return " "; 
        }
    }

    public updateCell(index:number, newVal: number) {
        this.cells[index].value = newVal; 
    }

    public checkWon(): boolean {
        // check rows 
        for (let rowVal = 0; rowVal < 9; rowVal += 3) {
            if (this.getCellValue(rowVal) != -1 && this.getCellValue(rowVal) === this.getCellValue(rowVal+1) && this.getCellValue(rowVal) === this.getCellValue(rowVal+2)) {
                this.setValue(this.getCellValue(rowVal))
                return true;  
            }
        }

        // check columns 
        for (let colVal = 0; colVal < 3; ++colVal) {
            if (this.getCellValue(colVal) != -1 && this.getCellValue(colVal) === this.getCellValue(colVal+3) && this.getCellValue(colVal) === this.getCellValue(colVal+6)) {
                this.setValue(this.getCellValue(colVal)); 
                return true; 
            }
        }

        // check diagonal (Upper Left -> Lower Right)
        if (this.getCellValue(0) != -1 && this.getCellValue(0) === this.getCellValue(4) && this.getCellValue(0) === this.getCellValue(8)) {
            this.setValue(this.getCellValue(0));
            return true; 
        }

        // check diagonal (Lower Left -> Upper Right)
        if (this.getCellValue(2) != -1 && this.getCellValue(2) === this.getCellValue(4) && this.getCellValue(2) === this.getCellValue(6)) {
            this.setValue(this.getCellValue(2)); 
            return true; 
        }

        return false; 
    }
}