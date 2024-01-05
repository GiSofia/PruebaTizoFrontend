import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './components/shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './components/layout/pages/layout-page/layout-page.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'auth',
        loadChildren : () => import('./modules/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'layout',
        loadChildren : () => import('./components/layout/layout.module').then(m => m.LayoutModule),
      },
      {
        path: 'dashboard',
        loadChildren : () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'products',
        loadChildren : () => import('./modules/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'categories',
        loadChildren : () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
      },
      {
        path: 'users',
        loadChildren : () => import('./modules/users/users.module').then(m => m.UsersModule),
      },
      {
        path: '404',
        component : Error404PageComponent,
      },
      {
        path: '',
        redirectTo : 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo : '404',
      },
    ]
  }

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
