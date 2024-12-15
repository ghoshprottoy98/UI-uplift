import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebNotificationsComponent } from './layout/web-notifications/web-notifications.component';
import { SmsEmailNotificationHistoryComponent } from './layout/sms-email-notification-history/sms-email-notification-history.component';
import { LayoutsComponent } from './layout/layouts/layouts.component';
import { TemplatesComponent } from './layout/templates/templates.component';
import { HomeComponent } from './layout/home/home.component';
import { SmsHistoryComponent } from './layout/sms-email-notification-history/sms-history/sms-history.component';
import { EmailHistoryComponent } from './layout/sms-email-notification-history/email-history/email-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent },
  { path: 'layouts', component: LayoutsComponent },
  { path: 'templates', component: TemplatesComponent },
  // { path: 'sms-email-notification-history', component: SmsEmailNotificationHistoryComponent },
  { path: 'web-notifications', component: WebNotificationsComponent },
  { path: 'sms-email-notification-history/sms', component: SmsHistoryComponent },
  { path: 'sms-email-notification-history/email', component: EmailHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
