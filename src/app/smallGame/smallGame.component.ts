import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { smallGrid } from '../gameGrid';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { winPopupComponent } from '../winPopup/winPopup.component';

@Component({
  selector: 'smallGame',
  imports: [CommonModule, MatDialogModule, winPopupComponent], 
  standalone: true, 
  templateUrl: './smallGame.component.html',
  styleUrls: ['./smallGame.component.css']
})
export class smallGameComponent {
    game: smallGrid = new smallGrid(0, 0); 
    cellInds =  [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8]
    ]; 
    turnNum:number = 0;
    errorModalOpen: boolean = false; 
    gameWon: boolean = false; 
    constructor(private winPopup: MatDialog) {}

    onCellClick(index: number) {
        if (this.game.isCellClickable(index)) {
            this.game.toggleCellClickable(index, false); 
            this.game.updateCell(index, this.turnNum+1);
            if (this.game.checkWon()) this.handleWin(); 

            this.turnNum = (this.turnNum + 1) % 2;
        } 
    }

    handleWin() {
        this.winPopup.open(winPopupComponent, {
            data: {player: this.turnNum}
        });

        for (let ind = 0; ind < 9; ++ind) {
            this.game.toggleCellClickable(ind, false); 
        }
        // add code for highlighting the border of the game box
    }
}
