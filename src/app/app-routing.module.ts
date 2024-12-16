import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebNotificationsComponent } from './layout/web-notifications/web-notifications.component';
import { LayoutsComponent } from './layout/layouts/layouts.component';
import { TemplatesComponent } from './layout/templates/templates.component';
import { HomeComponent } from './layout/home/home.component';
import { SmsHistoryComponent } from './layout/sms-email-notification-history/sms-history/sms-history.component';
import { EmailHistoryComponent } from './layout/sms-email-notification-history/email-history/email-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'app/admission/setup/admission-process/list', component: LayoutsComponent },
  { path: 'app/admission/setup/institute/university/list', component: TemplatesComponent },
  { path: 'app/admission/setup/education-board/list', component: WebNotificationsComponent },
  { path: 'sms-email-notification-history/sms', component: SmsHistoryComponent },
  { path: 'sms-email-notification-history/email', component: EmailHistoryComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
