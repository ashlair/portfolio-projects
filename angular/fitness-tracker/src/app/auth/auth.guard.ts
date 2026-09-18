import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

import * as fromRoot from '../reducers';

@Injectable()
export class AuthGuard  {
  constructor(private store: Store<fromRoot.State>) {}

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}
