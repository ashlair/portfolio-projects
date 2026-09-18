import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../reducers';
import * as uiActions from '../constants/ui-actions';
import * as authActions from '../constants/auth-actions';

@Injectable()
export class AuthService {
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new authActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/user-login']);
        this.store.dispatch(new authActions.SetUnauthenticated());
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new uiActions.StartLoading());
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new uiActions.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new uiActions.StartLoading());
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((error) => {
        this.store.dispatch(new uiActions.StopLoading());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  logout() {
    this.angularFireAuth.signOut();
  }
}
