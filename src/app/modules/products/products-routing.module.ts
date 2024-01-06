import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';

//localhost:4200/products
const routes: Routes = [
  {
    path: '',
    redirectTo: 'product-list',
    pathMatch: 'full'
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'product-list/product-add',
    component: ProductAddComponent,
  },
  {
    path: 'product-list/product-update/:id',
    component: ProductUpdateComponent,
  },
  {
    path: '**',
    redirectTo: 'product-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule { }
