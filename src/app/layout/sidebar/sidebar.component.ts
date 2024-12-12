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
    { label: 'Layouts', route: '/home/layouts' },
    { label: 'Templates', route: '/home/templates' },
    { label: 'SMS/Email Notification History', route: '/home/sms-email-notification-history' },
    { label: 'Web Notifications', route: '/home/web-notifications' }
  ];
  
  selectedLabel: string | null = null;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
  }

  selectItem(label: string): void {
    this.selectedLabel = label;
  }
}
