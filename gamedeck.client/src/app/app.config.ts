import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { auth0Settings } from './auth/auth0.settings';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: auth0Settings.domain,
        clientId: auth0Settings.clientId,
        cacheLocation: 'localstorage',
        useRefreshTokens: true,
        authorizationParams: {
          audience: auth0Settings.audience,
          redirect_uri: `${window.location.origin}/login/callback`
        },
        httpInterceptor: {
          allowedList: ['/api/*']
        }
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ]
};

