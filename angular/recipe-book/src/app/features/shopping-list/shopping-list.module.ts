import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ShoppingListComponent,
  ShoppingListEditComponent,
  ShoppingListViewComponent,
} from '.';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListViewComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
  ],
})
export class ShoppingListModule {}
