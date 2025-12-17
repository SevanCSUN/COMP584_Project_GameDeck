import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';
import { GameDto } from '../../models/game-dto.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);

  private gameId$: Observable<number> = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    distinctUntilChanged()
  );

  game$: Observable<GameDto | null> = this.gameId$.pipe(
    switchMap(id =>
      this.gameService.getGame(id).pipe(
        catchError(err => {
          this.error = 'Failed to load game details.';
          console.error('Error loading game:', err);
          return of(null);
        })
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  editGame(game: GameDto): void {
    this.router.navigate(['/game-edit'], {
      queryParams: { platformId: game.platformId, gameId: game.id }
    });
  }
}


