import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';


//localhost:4200/users
const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full'
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user-list/user-add',
    component: UserAddComponent,
  },
  {
    path: 'user-list/user-update/:id',
    component: UserUpdateComponent,
  },
  {
    path: '**',
    redirectTo: 'user-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
