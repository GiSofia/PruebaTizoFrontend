import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeaderModule } from '../header/header.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { RouterModule, Routes } from '@angular/router';

const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
  },
];


@NgModule({
  declarations: [
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(layoutRoutes),
    HeaderModule,
    SideNavModule
  ]
})
export class LayoutModule { }
