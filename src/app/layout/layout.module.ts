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
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarLogoComponent } from './sidebar/sidebar-logo/sidebar-logo.component';
import { ToolbarBreadcrumbsComponent } from './toolbar/toolbar-breadcrumbs/toolbar-breadcrumbs.component';
import { ToolbarProfileComponent } from './toolbar/toolbar-profile/toolbar-profile.component';
import { FuseFullscreenModule} from "@bracit/angular/fullscreen";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyTailwindcssModule} from "@notiz/formly-tailwindcss";
import {TittleBarComponent} from "./components/tittle-bar/tittle-bar.component";
import {InlineSVGModule} from 'ng-inline-svg-2';
import { WebNotificationsComponent } from './web-notifications/web-notifications.component';
import {FormlyMatDatepickerModule} from "@ngx-formly/material/datepicker";
import { DatePickerModule } from '../../shared/types/formly/date-picker/date-picker.module';
import {FormlyMaterialModule} from "@ngx-formly/material";
import {MatNativeDateModule} from "@angular/material/core";
import { ReactiveFormsModule } from '@angular/forms';




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
    EmailHistoryComponent,
    SidebarMenuComponent,
    SidebarLogoComponent,
    ToolbarBreadcrumbsComponent,
    ToolbarProfileComponent,
    WebNotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    NgOptimizedImage,
    EasyGridModule,
    FuseFullscreenModule,
    FormlyModule.forRoot(),
    FormlyTailwindcssModule,
    TittleBarComponent,
    InlineSVGModule,
    FormlyMatDatepickerModule,
    DatePickerModule,
    FormlyMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule

  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
