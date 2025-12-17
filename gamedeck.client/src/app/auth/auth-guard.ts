import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    tap(isAuthed => {
      if (!isAuthed) {
        auth.loginWithRedirect({ appState: { target: state.url } });
      }
    }),
    map(isAuthed => isAuthed)
  );
};


