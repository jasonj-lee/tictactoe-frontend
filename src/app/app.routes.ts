import { Routes } from '@angular/router';
import { LoadScreenComponent } from './load-screen/load-screen.component';
import { SmallGameComponent } from './small-game/small-game.component';
import { LargeGameComponent } from './large-game/large-game.component';

export const routes: Routes = [
    {
        path: "", 
        title: "Landing Page", 
        component: LoadScreenComponent
    }, 
    {
        path: "small-game",
        title: "Small Game",
        component: SmallGameComponent
    }, 
    {
        path: "large-game", 
        title: "Large Game", 
        component: LargeGameComponent
    }
];
