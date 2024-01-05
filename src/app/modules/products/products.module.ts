import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ProductListIdComponent } from './pages/product-list-id/product-list-id.component';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductListComponent,
    ProductListIdComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    TableModule,
    TagModule,
    FormsModule,
    ToastrModule.forRoot(),
  ]
})
export class ProductsModule { }
