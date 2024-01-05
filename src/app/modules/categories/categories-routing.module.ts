import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryAddComponent } from './pages/category-add/category-add.component';

//localhost:4200/categories
const routes: Routes = [{
  path: '',
  component: CategoryListComponent,
  children: [
    {path: 'category-add', component: CategoryAddComponent},
    {path: '**', redirectTo: 'list'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
