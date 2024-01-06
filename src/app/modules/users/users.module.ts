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
import { UserUpdateComponent } from './pages/user-update/user-update.component';


@NgModule({
  declarations: [
    UserAddComponent,
    UserListComponent,
    UserUpdateComponent
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
