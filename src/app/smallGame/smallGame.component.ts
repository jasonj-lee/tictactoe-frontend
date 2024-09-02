import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { smallGrid } from '../gameGrid';

@Component({
  selector: 'smallGame',
  imports: [CommonModule], 
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

    onCellClick(index: number) {
        if (this.game.getCellValue(index) == -1) {
            this.game.updateCell(index, this.turnNum+1);
            if (this.game.checkWon()) this.handleWin(); 

            this.turnNum = (this.turnNum + 1) % 2;
        } else {
            this.errorModalOpen = true; 
        }
    }

    handleWin() {
        this.gameWon = true;
        // add code for highlighting the border of the game box
        // make it so that cells can no longer be toggled
    }
}
