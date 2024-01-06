import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    RouterModule,
    TableModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ToastrModule.forRoot(),
  ]
})
export class ProductsModule { }
