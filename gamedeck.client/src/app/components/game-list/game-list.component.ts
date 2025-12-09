import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Game } from '../../models/game.model';
import { Console } from '../../models/console.model';
import { GameService } from '../../services/game.service';
import { ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  consoles: Console[] = [];
  selectedConsoleId: number | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private gameService: GameService,
    private consoleService: ConsoleService
  ) { }

  ngOnInit(): void {
    this.loadConsoles();
    this.loadGames();
  }

  loadConsoles(): void {
    this.consoleService.getConsoles().subscribe({
      next: (data) => {
        this.consoles = data;
      },
      error: (err) => {
        console.error('Error loading consoles:', err);
      }
    });
  }

  loadGames(): void {
    this.loading = true;
    this.error = null;
    
    this.gameService.getGames(this.selectedConsoleId || undefined).subscribe({
      next: (data) => {
        this.games = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load games. Make sure the API is running.';
        this.loading = false;
        console.error('Error loading games:', err);
      }
    });
  }

  onConsoleFilterChange(): void {
    this.loadGames();
  }

  clearFilter(): void {
    this.selectedConsoleId = null;
    this.loadGames();
  }
}

