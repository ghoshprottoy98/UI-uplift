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
import { EasyGridModule } from "@bracit/angular/easy-grid";
import { SmsHistoryComponent } from './sms-email-notification-history/sms-history/sms-history.component';
import { EmailHistoryComponent } from './sms-email-notification-history/email-history/email-history.component';
import {MatIconModule} from "@angular/material/icon";

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
    HomeComponent,
    SmsHistoryComponent,
    EmailHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    NgOptimizedImage,
    EasyGridModule,
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
