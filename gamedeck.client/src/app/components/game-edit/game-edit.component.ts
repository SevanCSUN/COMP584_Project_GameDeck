
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Game } from '../../models/game.model';
import { Console } from '../../models/console.model';
import { GameService } from '../../services/game.service';
import { ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-game-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  gameForm: FormGroup;
  consoles: Console[] = [];
  games: Game[] = [];
  selectedConsoleId: number | null = null;
  selectedGameId: number | null = null;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private consoleService: ConsoleService
  ) {
    this.gameForm = this.fb.group({
      platformId: ['', Validators.required],
      gameId: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      releaseDate: ['', [Validators.required, this.dateValidator]],
      genre: ['', [Validators.required, Validators.maxLength(50)]],
      developer: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      numPlayers: [null, [Validators.min(1), Validators.max(16)]]
    });
  }

  ngOnInit(): void {
    this.loadConsoles();
    
    // Watch for console selection changes
    this.gameForm.get('platformId')?.valueChanges.subscribe(consoleId => {
      this.onConsoleSelected(consoleId);
    });

    // Watch for game selection changes
    this.gameForm.get('gameId')?.valueChanges.subscribe(gameId => {
      this.onGameSelected(gameId);
    });
  }

  loadConsoles(): void {
    this.consoleService.getConsoles().subscribe({
      next: (data) => {
        this.consoles = data;
      },
      error: (err) => {
        this.error = 'Failed to load consoles.';
        console.error('Error loading consoles:', err);
      }
    });
  }

  onConsoleSelected(consoleId: number | null): void {
    this.selectedConsoleId = consoleId;
    this.selectedGameId = null;
    this.games = [];
    
    // Reset game selection
    this.gameForm.patchValue({ gameId: '' }, { emitEvent: false });
    
    if (consoleId) {
      this.loadGamesForConsole(consoleId);
    }
  }

  loadGamesForConsole(consoleId: number): void {
    this.loading = true;
    this.gameService.getGames(consoleId).subscribe({
      next: (data) => {
        this.games = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load games for selected console.';
        this.loading = false;
        console.error('Error loading games:', err);
      }
    });
  }

  onGameSelected(gameId: number | null): void {
    this.selectedGameId = gameId;
    this.error = null;
    this.success = null;
    
    if (gameId) {
      this.loadGameDetails(gameId);
    } else {
      // Reset form if no game selected
      this.gameForm.patchValue({
        title: '',
        releaseDate: '',
        genre: '',
        developer: '',
        description: '',
        numPlayers: null
      });
    }
  }

  loadGameDetails(gameId: number): void {
    this.loading = true;
    this.gameService.getGame(gameId).subscribe({
      next: (game) => {
        // Format date for input field (YYYY-MM-DD)
        const releaseDate = new Date(game.releaseDate);
        const formattedDate = releaseDate.toISOString().split('T')[0];
        
        this.gameForm.patchValue({
          title: game.title,
          releaseDate: formattedDate,
          genre: game.genre,
          developer: game.developer,
          description: game.description,
          numPlayers: game.numPlayers || null
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load game details.';
        this.loading = false;
        console.error('Error loading game:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.gameForm.valid && this.selectedGameId) {
      this.loading = true;
      this.error = null;
      this.success = null;

      const formValue = this.gameForm.value;
      const gameData: Game = {
        id: this.selectedGameId,
        platformId: formValue.platformId,
        title: formValue.title,
        releaseDate: formValue.releaseDate,
        genre: formValue.genre,
        developer: formValue.developer,
        description: formValue.description,
        numPlayers: formValue.numPlayers || undefined
      };

      this.gameService.updateGame(this.selectedGameId, gameData).subscribe({
        next: () => {
          this.success = 'Game updated successfully!';
          this.loading = false;
          // Reload the game to get updated data
          this.loadGameDetails(this.selectedGameId!);
        },
        error: (err) => {
          this.error = 'Failed to update game. Please try again.';
          this.loading = false;
          console.error('Error updating game:', err);
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.gameForm.controls).forEach(key => {
        this.gameForm.get(key)?.markAsTouched();
      });
    }
  }

  // Custom validator for date (must not be in the future)
  dateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    if (selectedDate > today) {
      return { futureDate: true };
    }
    return null;
  }

  // Helper methods for template
  getFieldError(fieldName: string): string {
    const field = this.gameForm.get(fieldName);
    if (field && field.touched && field.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['maxlength'].requiredLength} characters.`;
      }
      if (field.errors['min']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['min'].min}.`;
      }
      if (field.errors['max']) {
        return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['max'].max}.`;
      }
      if (field.errors['futureDate']) {
        return 'Release date cannot be in the future.';
      }
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      platformId: 'Console',
      gameId: 'Game',
      title: 'Title',
      releaseDate: 'Release Date',
      genre: 'Genre',
      developer: 'Developer',
      description: 'Description',
      numPlayers: 'Number of Players'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.gameForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}

