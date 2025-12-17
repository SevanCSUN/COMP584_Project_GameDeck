import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Console } from '../../models/console.model';
import { Game } from '../../models/game.model';
import { ConsoleService } from '../../services/console.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsyncPipe, RouterLink],
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private consoleService = inject(ConsoleService);
  private gameService = inject(GameService);

  loading = false;
  error: string | null = null;
  success: string | null = null;

  consoles$: Observable<Console[]> = this.consoleService.getConsoles().pipe(
    catchError(err => {
      console.error('Error loading consoles:', err);
      this.error = 'Failed to load consoles.';
      return of([]);
    })
  );

  form: FormGroup = this.fb.group({
    platformId: [null, Validators.required],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
    releaseDate: ['', [Validators.required, this.dateValidator]],
    genre: ['', [Validators.required, Validators.maxLength(50)]],
    developer: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    numPlayers: [null, [Validators.min(1), Validators.max(16)]]
  });

  ngOnInit(): void {
    const platformIdParam = this.route.snapshot.queryParamMap.get('platformId');
    if (platformIdParam) {
      this.form.patchValue({ platformId: Number(platformIdParam) });
    }
  }

  onSubmit(): void {
    this.error = null;
    this.success = null;

    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => this.form.get(key)?.markAsTouched());
      return;
    }

    this.loading = true;

    const v = this.form.value;
    const payload: Game = {
      id: 0, // server will assign
      platformId: Number(v.platformId),
      title: v.title,
      releaseDate: v.releaseDate,
      genre: v.genre,
      developer: v.developer,
      description: v.description,
      numPlayers: v.numPlayers ?? undefined
    };

    this.gameService.createGame(payload).subscribe({
      next: created => {
        this.loading = false;
        this.router.navigate(['/games', created.id]);
      },
      error: err => {
        this.loading = false;
        console.error('Error creating game:', err);
        this.error = 'Failed to create game. Please try again.';
      }
    });
  }

  // Same validator concept as Edit Game: must not be in the future
  dateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return selectedDate > today ? { futureDate: true } : null;
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.touched && field.errors) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required.`;
      if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters.`;
      if (field.errors['maxlength']) return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['maxlength'].requiredLength} characters.`;
      if (field.errors['min']) return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['min'].min}.`;
      if (field.errors['max']) return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['max'].max}.`;
      if (field.errors['futureDate']) return 'Release date cannot be in the future.';
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      platformId: 'Console',
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
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}


