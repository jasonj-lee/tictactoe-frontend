import { Routes } from '@angular/router';
import { loadScreenComponent } from './loadScreen/loadScreen.component';
import { smallGameComponent } from './smallGame/smallGame.component';

export const routes: Routes = [
    {
        path: "", 
        title: "Landing Page", 
        component: loadScreenComponent
    }, 
    {
        path: "small-game",
        title: "Small Game",
        component: smallGameComponent
    }, 
];
