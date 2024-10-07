import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';

class User {
    constructor (
        public name: string, 
        public wins: number, 
        public gamesPlayed: number, 
        public winRate: string
    ) {};
}

@Component({
  selector: 'leaderboard',
  imports: [RouterModule, HttpClientModule, CommonModule],
  standalone: true, 
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
    users: any[] = []; 

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUsers().subscribe({
        next: (response) => {
            this.users = response.map(
                (userElem: any) => new User(userElem.name, userElem.wins, userElem.gamesPlayed, 
                    (userElem.gamesPlayed > 0) ? (Math.round(((userElem.wins / userElem.gamesPlayed) + Number.EPSILON) * 1000) / 1000).toFixed(3) : "0.000"
                )
            )
        },
        error: (err) => console.error('Error fetching users:', err),
        });
    }
}
