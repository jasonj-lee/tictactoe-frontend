import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallGrid } from '../gameGrid';
import { BaseGamePage } from '../abstract-game-page';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { WinPopupComponent } from '../win-popup/win-popup.component';

@Component({
  selector: 'small-game',
  imports: [CommonModule, MatDialogModule], 
  standalone: true,
  templateUrl: './small-game.component.html',
  styleUrls: ['./small-game.component.css']
})
export class SmallGameComponent implements BaseGamePage {
    grid: SmallGrid; 
    turnNum: number; 
    winStatus: number; 
    
    constructor(private winPopup: MatDialog) {
        this.grid = new SmallGrid(); 
        this.turnNum = 0; 
        this.winStatus = -1; 
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
        }
    }

    checkWin(): boolean {
        return this.grid.checkWon(); 
    }

    handleWin(): void {
        // add code to change border
        this.winStatus = this.turnNum; 
        this.winPopup.open(WinPopupComponent, {
            data: {player: this.turnNum + 1}
        });
        for (let cellInd = 0; cellInd < 9; ++cellInd) {
            this.grid.toggleCellClickable(cellInd, false); 
        } 
    }
}
