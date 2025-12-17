import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';
import { Console } from '../../models/console.model';
import { GameDto } from '../../models/game-dto.model';
import { ConsoleService } from '../../services/console.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-console-detail',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './console-detail.component.html',
  styleUrls: ['./console-detail.component.css']
})
export class ConsoleDetailComponent {
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private consoleService = inject(ConsoleService);
  private gameService = inject(GameService);

  private consoleId$: Observable<number> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    distinctUntilChanged()
  );

  console$: Observable<Console | null> = this.consoleId$.pipe(
    switchMap(id =>
      this.consoleService.getConsole(id).pipe(
        catchError(err => {
          this.error = 'Failed to load console details.';
          console.error('Error loading console:', err);
          return of(null);
        })
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  games$: Observable<GameDto[]> = this.consoleId$.pipe(
    switchMap(id =>
      this.gameService.getGames(id).pipe(
        catchError(err => {
          this.error = 'Failed to load games for this console.';
          console.error('Error loading games:', err);
          return of([]);
        })
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  goToGame(gameId: number): void {
    this.router.navigate(['/games', gameId]);
  }
}


