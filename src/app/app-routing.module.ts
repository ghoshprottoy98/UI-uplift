import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebNotificationsComponent } from './web-notifications/web-notifications.component';
import { SmsEmailNotificationHistoryComponent } from './layout/sms-email-notification-history/sms-email-notification-history.component';
import { LayoutsComponent } from './layout/layouts/layouts.component';
import { TemplatesComponent } from './layout/templates/templates.component';

const routes: Routes = [
  { path: '', component: LayoutsComponent },  
  { path: 'layouts', component: LayoutsComponent },  
  { path: 'templates', component: TemplatesComponent },
  { path: 'sms-email-notification-history', component: SmsEmailNotificationHistoryComponent },
  { path: 'web-notifications', component: WebNotificationsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
