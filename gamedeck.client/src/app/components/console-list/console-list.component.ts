import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Console } from '../../models/console.model';
import { ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-console-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './console-list.component.html',
  styleUrls: ['./console-list.component.css']
})
export class ConsoleListComponent {
  consoles$: Observable<Console[]>;
  error: string | null = null;

  constructor(private consoleService: ConsoleService, private router: Router) {
    this.consoles$ = this.consoleService.getConsoles().pipe(
      catchError(err => {
        this.error = 'Failed to load consoles. Make sure the API is running.';
        console.error('Error loading consoles:', err);
        return of([]);
      })
    );
  }

  goToConsole(consoleId: number): void {
    this.router.navigate(['/consoles', consoleId]);
  }
}

