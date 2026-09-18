import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this._ingredients.slice();
  }

  getIngredient(index: number) {
    return this._ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this._ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  removeIngredient(index: number) {
    this._ingredients.splice(index, 1);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
}
