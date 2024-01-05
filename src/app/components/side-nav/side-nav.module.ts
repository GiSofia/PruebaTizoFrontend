// SideNavModule
import { NgModule } from '@angular/core';
import { SideNavLayoutComponent } from './side-nav-layout/side-nav-layout.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SideNavLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SideNavLayoutComponent]
})
export class SideNavModule { }
