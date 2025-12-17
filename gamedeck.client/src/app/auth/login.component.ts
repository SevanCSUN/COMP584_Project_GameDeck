import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private returnUrl = '/';

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
  }

  login(): void {
    this.auth.loginWithRedirect({ appState: { target: this.returnUrl } });
  }
}


