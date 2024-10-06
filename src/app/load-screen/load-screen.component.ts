import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard.component';

@Component({
  selector: 'load-screen',
  imports: [RouterModule, LeaderboardComponent],
  standalone: true, 
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.css']
})
export class LoadScreenComponent {

}
