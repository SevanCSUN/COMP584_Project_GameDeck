import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `<div class="callback">Signing you in...</div>`,
  styles: [
    `
      .callback {
        padding: 2rem;
        text-align: center;
        font-size: 1.1rem;
      }
    `
  ]
})
export class AuthCallbackComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.handleRedirectCallback().subscribe({
      next: (result: unknown) => {
        const target = ((result as any)?.appState as any)?.target ?? '/';
        this.router.navigateByUrl(target);
      },
      error: () => {
        this.router.navigateByUrl('/login');
      }
    });
  }
}


