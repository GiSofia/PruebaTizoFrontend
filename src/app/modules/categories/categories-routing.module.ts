import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryAddComponent } from './pages/category-add/category-add.component';
import { CategoryUpdateComponent } from './pages/category-update/category-update.component';
import { UserRoleGuard } from 'src/app/guards/user-role.guard';

//localhost:4200/categories
const routes: Routes = [
  {
    path: '',
    redirectTo: 'category-list',
    pathMatch: 'full'
  },
  {
    path: 'category-list',
    component: CategoryListComponent,
  },
  {
    path: 'category-list/category-add',
    component: CategoryAddComponent,
  },
  {
    path: 'category-list/category-update/:id',
    component: CategoryUpdateComponent,
    canActivate: [UserRoleGuard]
  },
  {
    path: '**',
    redirectTo: 'category-list',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
