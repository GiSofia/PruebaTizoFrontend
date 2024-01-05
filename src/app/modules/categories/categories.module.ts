import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryAddComponent } from './pages/category-add/category-add.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    CategoryAddComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TableModule
  ]
})
export class CategoriesModule { }
