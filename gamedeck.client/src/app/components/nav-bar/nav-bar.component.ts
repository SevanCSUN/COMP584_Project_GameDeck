import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public authService: AuthService) {}

  login(): void {
    this.authService.loginWithRedirect();
  }

  logout(): void {
    this.authService.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}


