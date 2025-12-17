import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GameDto } from '../../models/game-dto.model';
import { Console } from '../../models/console.model';
import { GameService } from '../../services/game.service';
import { ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games$!: Observable<GameDto[]>;
  consoles$!: Observable<Console[]>;
  selectedConsoleId: number | null = null;
  error: string | null = null;

  constructor(
    private gameService: GameService,
    private consoleService: ConsoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadConsoles();
    this.loadGames();
  }

  loadConsoles(): void {
    this.consoles$ = this.consoleService.getConsoles().pipe(
      catchError(err => {
        console.error('Error loading consoles:', err);
        // Keep the UI usable even if consoles fail
        return of([]);
      })
    );
  }

  loadGames(): void {
    this.error = null;

    this.games$ = this.gameService.getGames(this.selectedConsoleId || undefined).pipe(
      catchError(err => {
        this.error = 'Failed to load games. Make sure the API is running.';
        console.error('Error loading games:', err);
        return of([]);
      })
    );
  }

  onConsoleFilterChange(): void {
    this.loadGames();
  }

  clearFilter(): void {
    this.selectedConsoleId = null;
    this.loadGames();
  }

  goToGame(gameId: number): void {
    this.router.navigate(['/games', gameId]);
  }
}

