import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private _recipeService: RecipeService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this._recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this._recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route });
  }

  onDeleteRecipe() {
    this._recipeService.deleteRecipe(this.id);
    this._router.navigate(['/recipes']);
  }
}
