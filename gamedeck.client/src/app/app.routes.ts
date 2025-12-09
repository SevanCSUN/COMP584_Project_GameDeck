import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConsoleListComponent } from './components/console-list/console-list.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameEditComponent } from './components/game-edit/game-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'consoles', component: ConsoleListComponent },
  { path: 'games', component: GameListComponent },
  { path: 'game-edit', component: GameEditComponent },
  { path: '**', redirectTo: '' }
];

