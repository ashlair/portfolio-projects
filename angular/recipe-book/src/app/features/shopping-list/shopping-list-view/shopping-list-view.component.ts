import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-view',
  templateUrl: './shopping-list-view.component.html',
  styleUrls: ['./shopping-list-view.component.css'],
})
export class ShoppingListViewComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private _ingSubjectChanged: Subscription;

  constructor(private _shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this._shoppingListService.getIngredients();
    this._ingSubjectChanged =
      this._shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    this._shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this._ingSubjectChanged.unsubscribe();
  }
}
