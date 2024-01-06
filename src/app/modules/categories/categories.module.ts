import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryAddComponent } from './pages/category-add/category-add.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    CategoryAddComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    TableModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ToastrModule.forRoot(),
  ]
})
export class CategoriesModule { }
