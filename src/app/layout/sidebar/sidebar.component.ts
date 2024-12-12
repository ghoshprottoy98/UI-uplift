import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed$ = new Observable<boolean>();
  menuItems = [
    { label: 'Layouts', route: '/home/layouts' },
    { label: 'Templates', route: '/home/templates' },
    { label: 'SMS/Email Notification History', route: '/home/sms-email-notification-history' },
    { label: 'Web Notifications', route: '/home/web-notifications' }
  ];
  
  selectedLabel: string | null = null;

  constructor(private layoutService: LayoutService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
    this.setSelectedLabelFromRoute();
    this.router.events.subscribe(() => {
      this.setSelectedLabelFromRoute();
    });
  }

  selectItem(label: string): void {
    this.selectedLabel = label;
  }

  private setSelectedLabelFromRoute(): void {
    const currentUrl = this.router.url; 
    
    if (currentUrl === '/home') {
      this.selectedLabel = null; 
      return;
    }

    const selectedItem = this.menuItems.find(item => currentUrl.startsWith(item.route));  
    if (selectedItem) {
      this.selectedLabel = selectedItem.label; 
    }
  }
}
