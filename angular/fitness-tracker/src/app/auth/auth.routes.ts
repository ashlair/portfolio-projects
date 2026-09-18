import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTES: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'user-login', component: LoginComponent },
];
