import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed$ = new Observable<boolean>();
  menuItems = [
    { label: 'Layouts', route: '/layouts' },
    { label: 'Templates', route: '/templates' },
    { label: 'SMS/Email Notification History', route: '/sms-email-notification-history' },
    { label: 'Web Notifications', route: '/web-notifications' }
  ];
  
  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
  }
}
