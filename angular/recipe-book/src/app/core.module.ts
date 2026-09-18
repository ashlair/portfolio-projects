import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { DataStorageService } from './services/data-storage.service';
import { RecipeService } from './services/recipe.service';
import { RecipesResolverService } from './services/recipes-resolver.service';
import { ShoppingListService } from './services/shopping-list.service';

@NgModule({
  providers: [
    DataStorageService,
    RecipeService,
    RecipesResolverService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
