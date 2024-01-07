import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';


//localhost:4200/auth
const routes: Routes = [{
  path: '',
  component: AuthPageComponent,
  children: [
    {path: 'login', component: LoginPageComponent},
    {path: '**', redirectTo: 'login'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
