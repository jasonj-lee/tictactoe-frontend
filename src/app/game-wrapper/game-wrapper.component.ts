import { Component } from '@angular/core';
import { LargeGameComponent } from '../large-game/large-game.component';
import { SmallGameComponent } from '../small-game/small-game.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  imports: [CommonModule, LargeGameComponent, SmallGameComponent],
  templateUrl: './game-wrapper.component.html',
  styleUrl: './game-wrapper.component.css'
})
export class GameWrapperComponent {
  isLargeGame: boolean; 

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.isLargeGame = navigation?.extras.state?.['isLargeGame'] || false;
  }
}
