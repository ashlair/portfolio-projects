import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: () =>
      import('./training/training.routes').then((m) => m.TRAINING_ROUTES),
    canLoad: [AuthGuard],
  },
];
