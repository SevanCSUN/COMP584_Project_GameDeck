
import { Component, OnInit } from '@angular/core';
import { Console } from '../../models/console.model';
import { ConsoleService } from '../../services/console.service';

@Component({
  selector: 'app-console-list',
  standalone: true,
  imports: [],
  templateUrl: './console-list.component.html',
  styleUrls: ['./console-list.component.css']
})
export class ConsoleListComponent implements OnInit {
  consoles: Console[] = [];
  loading = true;
  error: string | null = null;

  constructor(private consoleService: ConsoleService) { }

  ngOnInit(): void {
    this.loadConsoles();
  }

  loadConsoles(): void {
    this.loading = true;
    this.error = null;
    
    this.consoleService.getConsoles().subscribe({
      next: (data) => {
        this.consoles = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load consoles. Make sure the API is running.';
        this.loading = false;
        console.error('Error loading consoles:', err);
      }
    });
  }
}

