import 'hammerjs';

import { importProvidersFrom } from '@angular/core';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { provideStore, StoreModule } from '@ngrx/store';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthGuard } from './app/auth/auth.guard';
import { AUTH_ROUTES } from './app/auth/auth.routes';
import { AuthService } from './app/auth/auth.service';
import { reducers } from './app/reducers';
import { UIService } from './app/shared/ui.service';
import { TrainingService } from './app/training/training.service';
import { environment } from './environments/environment';
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([...routes, ...AUTH_ROUTES]),
    provideAnimations(),
    provideStore({}),
    importProvidersFrom(MatDialogModule, MatNativeDateModule, MatSnackBarModule, StoreModule.forRoot(reducers)),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    AuthGuard,
    AuthService,
    TrainingService,
    UIService,
  ],
}).catch((err) => console.error(err));
