import { SmallGrid } from "./gameGrid";

export interface BaseGamePage {
    grid: SmallGrid | SmallGrid[];  
    turnNum: number; 
    currGameInd?: number; 

    checkClickable(cellInd: number, gridInd?: number): boolean;
    handleTurn(cellInd: number, gridInd?: number) : void; 
    checkWin(): boolean; 
    handleWin(): void; 
}