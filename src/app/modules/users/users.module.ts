import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    UserAddComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule
  ]
})
export class UsersModule { }
