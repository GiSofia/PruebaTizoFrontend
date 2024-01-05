import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserListComponent } from './pages/user-list/user-list.component';


//localhost:4200/users
const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    children: [
      {path: 'user-add', component: UserAddComponent},
      {path: '**', redirectTo: 'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
