import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ConsoleListComponent } from './components/console-list/console-list.component';
import { ConsoleCreateComponent } from './components/console-create/console-create.component';
import { ConsoleDetailComponent } from './components/console-detail/console-detail.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameCreateComponent } from './components/game-create/game-create.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { GameEditComponent } from './components/game-edit/game-edit.component';
import { LoginComponent } from './auth/login.component';
import { authGuard } from './auth/auth-guard';
import { AuthCallbackComponent } from './auth/auth-callback.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'consoles', component: ConsoleListComponent, canActivate: [authGuard] },
  { path: 'consoles/new', component: ConsoleCreateComponent, canActivate: [authGuard] },
  { path: 'consoles/:id', component: ConsoleDetailComponent, canActivate: [authGuard] },
  { path: 'games', component: GameListComponent, canActivate: [authGuard] },
  { path: 'games/new', component: GameCreateComponent, canActivate: [authGuard] },
  { path: 'games/:id', component: GameDetailComponent, canActivate: [authGuard] },
  { path: 'game-edit', component: GameEditComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: AuthCallbackComponent },
  { path: '**', redirectTo: '' }
];

