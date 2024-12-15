import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarTogglerComponent } from './components/sidebar-toggler/sidebar-toggler.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SmsEmailNotificationHistoryComponent } from './sms-email-notification-history/sms-email-notification-history.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { TemplatesComponent } from './templates/templates.component';
import { FooterComponent } from './footer/footer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HomeComponent } from './home/home.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { EasyGridModule } from "@bracit/angular/easy-grid";

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    SidebarTogglerComponent,
    NavbarComponent,
    SmsEmailNotificationHistoryComponent,
    LayoutsComponent,
    TemplatesComponent,
    FooterComponent,
    ToolbarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    EasyGridModule,
    InlineSVGModule.forRoot(),
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }