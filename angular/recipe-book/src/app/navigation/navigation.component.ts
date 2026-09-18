import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private _userSubscription: Subscription;

  constructor(
    private _dataStorageService: DataStorageService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._userSubscription = this._authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this._dataStorageService.storeRecipes();
  }

  onFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }
}
