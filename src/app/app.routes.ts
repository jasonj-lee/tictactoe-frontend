import { Routes } from '@angular/router';
import { LoadScreenComponent } from './load-screen/load-screen.component';
import { GameWrapperComponent } from './game-wrapper/game-wrapper.component';
import { BlitzGameComponent } from './blitz-game/blitz-game.component';

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
        path: "play-blitz", 
        title: "Play Blitz", 
        component: BlitzGameComponent
    }
];
