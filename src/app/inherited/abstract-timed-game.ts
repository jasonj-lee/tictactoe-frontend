import { BaseGamePage } from "./abstract-game-page";
import { SmallGrid } from "./gameGrid";


export abstract class TimedGame implements BaseGamePage {
    p1Time: number; // time (in seconds) left for player 1
    p2Time: number; // time (in seconds) left for player 2
    p1Interval: any; 
    p2Interval: any; 
    TIMER_INTERVAL: number = 1000; 
    turnNum: number; 
    winStatus: number; 
    abstract grid: SmallGrid | SmallGrid[]; 
    
    constructor(timeLimit: number) {
        this.p1Time = timeLimit; 
        this.p2Time = timeLimit; 
        this.turnNum = 0; 
        this.winStatus = -1; 
        this.toggleTimers(); 
    }

    setTime(newTime: number): void {
        this.p1Time = newTime; 
        this.p2Time = newTime; 
        this.toggleTimers(); 
    }

    startP1Time(): void {
        this.p1Interval = setInterval(() => {
        this.p1Time -= 1; 
        if (this.p1Time === 0) {
            this.turnNum = 1; // set turn number to player 2 for win handling 
            this.handleWin(); 
            clearInterval(this.p1Interval); 
        }
        }, this.TIMER_INTERVAL); 
    }

    startP2Time(): void {
        this.p2Interval = setInterval(() => {
        this.p2Time -= 1
        if (this.p2Time === 0) {
            this.turnNum = 0; // set turn number to player 1 for win handling 
            this.handleWin(); 
            clearInterval(this.p2Interval); 
        }
        }, this.TIMER_INTERVAL);
    }

    stopP1Time(): void {
        clearInterval(this.p1Interval); 
    }

    stopP2Time(): void {
        clearInterval(this.p2Interval); 
    }

    toggleTimers(): void {
        if (this.turnNum === 0) {
        this.startP1Time(); 
        this.stopP2Time(); 
        } else {
        this.startP2Time(); 
        this.stopP1Time(); 
        }
    }

    abstract checkClickable(cellInd: number, gridInd?: number): boolean;
    abstract handleTurn(cellInd: number, gridInd?: number): void;
    abstract checkWin(): boolean;
    abstract handleWin(): void;
}