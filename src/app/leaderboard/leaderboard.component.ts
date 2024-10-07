import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';

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
            this.users = response;
        },
        error: (err) => console.error('Error fetching users:', err),
        });
    }
}
