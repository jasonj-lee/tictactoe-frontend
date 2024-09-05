import { Injectable, Inject } from "@angular/core";
import { SmallGrid } from "./gameGrid";

@Injectable()
export class GameRunner {
    private isLargeGame: boolean;
    private gameArr: SmallGrid[];  
    private turnNum: number; 
    private currGameInd: number; 

    constructor () {
        this.isLargeGame = false; 
        this.gameArr = []; 
        this.turnNum = 0; 
        this.currGameInd = -1; 
    }

    initialize(gameType: boolean): void {
        this.isLargeGame = gameType; 
        this.gameArr = Array(this.isLargeGame ? 9 : 1).fill(new SmallGrid());
        this.turnNum = 0; 
        this.currGameInd = -1; 
    }

    checkClickable(gameInd: number, cellInd: number): boolean {
        if (this.currGameInd != -1 && this.currGameInd != gameInd) return false; 
        return this.gameArr[gameInd].isCellClickable(cellInd); 
    }

    handleTurn(gameInd: number, cellInd: number) {
        console.log(`Checking space ${cellInd} on grid ${gameInd}`)
        if (this.checkClickable(gameInd, cellInd)) {
            this.gameArr[gameInd].toggleCellClickable(cellInd, false); 
            this.gameArr[gameInd].updateCell(cellInd, this.turnNum+1);
            if (this.gameArr[gameInd].checkWon()) this.handleWin(); 

            if (this.isLargeGame) this.currGameInd = cellInd; 
            this.turnNum = (this.turnNum + 1) % 2;
        } 
    }

    checkLargeWin() {
        // check rows 
        for (let rowVal = 0; rowVal < 9; rowVal += 3) {
            if (this.gameArr[rowVal].getValue() != -1 && this.gameArr[rowVal].getValue() === this.gameArr[rowVal+1].getValue() && this.gameArr[rowVal].getValue() === this.gameArr[rowVal+2].getValue()) {
                return true;  
            }
        }

        // check columns 
        for (let colVal = 0; colVal < 3; ++colVal) {
            if (this.gameArr[colVal].getValue() != -1 && this.gameArr[colVal].getValue() === this.gameArr[colVal+3].getValue() && this.gameArr[colVal].getValue() === this.gameArr[colVal+6].getValue()) {
                return true;  
            }
        }

        // check diagonal (Upper Left -> Lower Right)
        if (this.gameArr[0].getValue() != -1 && this.gameArr[0].getValue() === this.gameArr[4].getValue() && this.gameArr[0].getValue() === this.gameArr[8].getValue()) {
            return true; 
        }

        // check diagonal (Lower Left -> Upper Right)
        if (this.gameArr[2].getValue() != -1 && this.gameArr[2].getValue() === this.gameArr[4].getValue() && this.gameArr[2].getValue() === this.gameArr[6].getValue()) {
            return true; 
        }
        
        return false; 
    }

    handleWin() {
        // add code to change border 

        if (!this.isLargeGame || this.checkLargeWin()) { // game entirely won 
            // open winner popup
            
            for (let gameInd = 0; gameInd < 9; ++gameInd) {
                for (let cellInd = 0; cellInd < 9; ++cellInd) {
                    this.gameArr[gameInd].toggleCellClickable(cellInd, false); 
                }
            } 
        } 
    }
}