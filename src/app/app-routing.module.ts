import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebNotificationsComponent } from './layout/web-notifications/web-notifications.component';
import { SmsEmailNotificationHistoryComponent } from './layout/sms-email-notification-history/sms-email-notification-history.component';
import { LayoutsComponent } from './layout/layouts/layouts.component';
import { TemplatesComponent } from './layout/templates/templates.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'layouts', component: LayoutsComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'sms-email-notification-history', component: SmsEmailNotificationHistoryComponent },
  { path: 'web-notifications', component: WebNotificationsComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
