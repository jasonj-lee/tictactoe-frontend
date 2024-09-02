import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallGameComponent } from '../small-game/small-game.component';

@Component({
  selector: 'large-game',
  standalone: true,
  imports: [CommonModule, SmallGameComponent],
  templateUrl: './large-game.component.html',
  styleUrl: './large-game.component.css'
})
export class LargeGameComponent {
  turnNum: number = 0;
  gameInds = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8]
  ]; 
}
