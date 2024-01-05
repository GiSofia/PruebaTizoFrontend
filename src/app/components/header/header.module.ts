// header.module.ts
import { NgModule } from '@angular/core';
import { HeaderLayoutComponent } from './header-layout/header-layout.component';

@NgModule({
  declarations: [
    HeaderLayoutComponent
  ],
  exports: [
    HeaderLayoutComponent
  ]
})
export class HeaderModule { }
