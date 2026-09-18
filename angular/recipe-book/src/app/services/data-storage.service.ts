import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private _firebaseDatabaseUrl = environment.firebaseConfig.databaseURL;
  constructor(
    private _http: HttpClient,
    private _recipeService: RecipeService,
    private _authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this._recipeService.getRecipes();
    this._http.put(`${this._firebaseDatabaseUrl}/recipes.json`, recipes);
  }

  fetchRecipes() {
    return this._http
      .get<Recipe[]>(`${this._firebaseDatabaseUrl}/recipes.json`)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this._recipeService.setRecipes(recipes);
        })
      );
  }
}
