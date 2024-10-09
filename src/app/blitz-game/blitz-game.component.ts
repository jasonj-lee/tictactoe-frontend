import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SmallGrid } from '../gameGrid';
import { WinPopupComponent } from '../win-popup/win-popup.component';

@Component({
  selector: 'blitz-game',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './blitz-game.component.html',
  styleUrls: ['./blitz-game.component.css', '../small-game/small-game.component.css']
})
export class BlitzGameComponent {
  grid: SmallGrid; 
  turnNum: number; 
  winStatus: number; 
  p1Time: number; // time (in seconds) left for player 1
  p2Time: number; // time (in seconds) left for player 2
  p1Interval: any; 
  p2Interval: any; 
  TIMER_INTERVAL: number = 1000; 
  
  constructor(private winPopup: MatDialog) {
      this.grid = new SmallGrid(); 
      this.turnNum = 0; 
      this.winStatus = -1; 
      this.p1Time = 300; // default: 5min 
      this.p2Time = 300; 
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

  checkClickable(cellInd: number): boolean {
    return this.grid.isCellClickable(cellInd); 
  }

  handleTurn(cellInd: number): void {
    if (this.checkClickable(cellInd)) {
      this.grid.toggleCellClickable(cellInd, false); 
      this.grid.updateCell(cellInd, this.turnNum+1); 
      if (this.checkWin()) {
        this.handleWin();
      } else {
        this.turnNum = (this.turnNum + 1) % 2; 
        this.toggleTimers();
      }
    }
  }

  checkWin(): boolean {
    return this.grid.checkWon(); 
  }

  handleWin(): void {
    this.winStatus = this.turnNum; 
    this.winPopup.open(WinPopupComponent, {
      data: {player: this.turnNum + 1}
    });
    for (let cellInd = 0; cellInd < 9; ++cellInd) {
      this.grid.toggleCellClickable(cellInd, false); 
    } 
    this.stopP1Time(); 
    this.stopP2Time(); 
  }
}
