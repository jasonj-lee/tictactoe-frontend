import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallGrid } from '../inherited/gameGrid';
import { BaseGamePage } from '../inherited/abstract-game-page';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { WinPopupComponent } from '../win-popup/win-popup.component';

@Component({
  selector: 'large-game',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './large-game.component.html',
  styleUrl: './large-game.component.css',
})
export class LargeGameComponent implements BaseGamePage {
  grid: SmallGrid[];
  turnNum: number; 
  currGameInd: number; 
  winStatus: number; 

  constructor(private winPopup: MatDialog) {
    this.grid = []; 
    for (let i = 0; i < 9; ++i) {
      this.grid.push(new SmallGrid()); 
    }
    this.turnNum = 0; 
    this.currGameInd = -1; 
    this.winStatus = -1; 
  }

  checkClickable(cellInd: number, gridInd: number): boolean {
    if (this.currGameInd != -1 && this.currGameInd != gridInd) return false; 
    return this.grid[gridInd].isCellClickable(cellInd); 
  }

  checkGridFull(gridInd: number): boolean {
    for (let cellInd = 0; cellInd < 9; ++cellInd) {
      if (this.checkClickable(cellInd, gridInd)) return false; 
    } 
    return true; 
  }

  handleTurn(cellInd: number, gridInd: number): void {
    if (this.checkClickable(cellInd, gridInd)) {
      this.grid[gridInd].toggleCellClickable(cellInd, false); 
      this.grid[gridInd].updateCell(cellInd, this.turnNum+1); 
      if (this.grid[gridInd].checkWon() && this.checkWin()) this.handleWin(); 

      // check whether next grid has valid spaces to play on
      this.currGameInd = cellInd; 
      
      // if next grid has valid spaces, then make that grid the only playable grid
      // otherwise, allow play on all (non-empty) grids 
      this.currGameInd = !this.checkGridFull(cellInd) ? cellInd : -1;
      this.turnNum = (this.turnNum + 1) % 2; 
    }
  }

  checkWin(): boolean {
      // check rows 
      for (let rowVal = 0; rowVal < 9; rowVal += 3) {
          if (this.grid[rowVal].getValue() != -1 && this.grid[rowVal].getValue() === this.grid[rowVal+1].getValue() && this.grid[rowVal].getValue() === this.grid[rowVal+2].getValue()) {
              return true;  
          }
      }

      // check columns 
      for (let colVal = 0; colVal < 3; ++colVal) {
          if (this.grid[colVal].getValue() != -1 && this.grid[colVal].getValue() === this.grid[colVal+3].getValue() && this.grid[colVal].getValue() === this.grid[colVal+6].getValue()) {
              return true;  
          }
      }

      // check diagonal (Upper Left -> Lower Right)
      if (this.grid[0].getValue() != -1 && this.grid[0].getValue() === this.grid[4].getValue() && this.grid[0].getValue() === this.grid[8].getValue()) {
          return true; 
      }

      // check diagonal (Lower Left -> Upper Right)
      if (this.grid[2].getValue() != -1 && this.grid[2].getValue() === this.grid[4].getValue() && this.grid[2].getValue() === this.grid[6].getValue()) {
          return true; 
      }
      
      return false; 
  }

  handleWin(): void {
      this.winStatus = this.turnNum; 
      this.winPopup.open(WinPopupComponent, {
        data: {player: this.turnNum + 1}
    });

      for (let gameInd = 0; gameInd < 9; ++gameInd) {
          for (let cellInd = 0; cellInd < 9; ++cellInd) {
              this.grid[gameInd].toggleCellClickable(cellInd, false); 
          }
      } 
  }

}
