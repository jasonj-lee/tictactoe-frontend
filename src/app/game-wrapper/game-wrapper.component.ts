import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LargeGameComponent } from '../large-game/large-game.component';
import { SmallGameComponent } from '../small-game/small-game.component';
import { BlitzSmallComponent } from '../blitz-small/blitz-small.component';
import { BlitzLargeComponent } from '../blitz-large/blitz-large.component';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  imports: [CommonModule, LargeGameComponent, SmallGameComponent, BlitzLargeComponent, BlitzSmallComponent],
  templateUrl: './game-wrapper.component.html',
  styleUrl: './game-wrapper.component.css'
})
export class GameWrapperComponent {
  isLargeGame: boolean;
  isBlitz: boolean;  

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.isLargeGame = navigation?.extras.state?.['isLargeGame'] || false;
    this.isBlitz = navigation?.extras.state?.['isBlitz'] || false; 
  }
}
