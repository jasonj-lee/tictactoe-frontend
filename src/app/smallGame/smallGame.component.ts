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
    turnNum = 0

    onCellClick(index: number) {
        console.log(index); 
        console.log("hi");
        this.game.updateCell(index, this.turnNum+1);
        this.turnNum = (this.turnNum + 1) % 2;
    }
}
