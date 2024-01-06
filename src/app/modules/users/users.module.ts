import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    UserAddComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ToastrModule.forRoot(),
  ]
})
export class UsersModule { }
