import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ChartModule } from 'primeng/chart';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
  },
];

@NgModule({
  declarations: [
    LayoutPageComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ChartModule],
  exports: [RouterModule],
})
export class DashboardModule { }
