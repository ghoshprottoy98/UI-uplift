import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarTogglerComponent } from './components/sidebar-toggler/sidebar-toggler.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    SidebarTogglerComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent 
  ]
})
export class LayoutModule { }
