import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SmallGrid } from '../inherited/gameGrid';
import { WinPopupComponent } from '../win-popup/win-popup.component';
import { TimedGame } from '../inherited/abstract-timed-game';

@Component({
  selector: 'blitz-small',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './blitz-small.component.html',
  styleUrls: ['./blitz-small.component.css', '../small-game/small-game.component.css']
})
export class BlitzSmallComponent extends TimedGame {
  grid: SmallGrid; 
  
  constructor(private winPopup: MatDialog) {
    let smallTimeLimit: number = 10; // time limit for a small game is 15 seconds 
    super(smallTimeLimit); 
    this.grid = new SmallGrid(); 
  }

  checkClickable(cellInd: number): boolean {
    return this.grid.isCellClickable(cellInd); 
  }

  handleTurn(cellInd: number): void {
    if (this.checkClickable(cellInd)) {
      this.grid.toggleCellClickable(cellInd, false); 
      this.grid.updateCell(cellInd, this.turnNum+1); 
      if (this.checkWin()) this.handleWin(); 

      this.turnNum = (this.turnNum + 1) % 2; 
      this.toggleTimers(); 
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
