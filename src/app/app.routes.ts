import { Routes } from '@angular/router';
import { LoadScreenComponent } from './load-screen/load-screen.component';
import { GameWrapperComponent } from './game-wrapper/game-wrapper.component';
import { SingleplayerComponent } from './singleplayer/singleplayer.component';

export const routes: Routes = [
    {
        path: "", 
        title: "Landing Page", 
        component: LoadScreenComponent
    }, 
    {
        path: "play-game",
        title: "Play Tic-Tac-Toe",
        component: GameWrapperComponent
    },
    {
        path: "play-singleplayer",
        title: "Play Singleplayer Tic-Tac-Toe", 
        component: SingleplayerComponent
    }
];
