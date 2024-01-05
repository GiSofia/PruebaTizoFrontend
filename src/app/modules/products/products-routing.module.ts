import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductListIdComponent } from './pages/product-list-id/product-list-id.component';

//localhost:4200/products
const routes: Routes = [{
    path: '',
    component: ProductListComponent,
    children: [
      {path: 'product-add', component: ProductAddComponent},
      {path: 'product-list-id', component: ProductListIdComponent},
      {path: '**', redirectTo: 'list'},
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
