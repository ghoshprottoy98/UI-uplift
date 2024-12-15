import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed$: Observable<boolean> | undefined;

  menuItems = [
    { label: 'Layouts', route: '/layouts', submenu: [] },
    { label: 'Templates', route: '/templates', submenu: [] },
    { label: 'SMS/Email Notification History', route: '/sms-email-notification-history', submenu: [] },
    { 
      label: 'Web Notifications', 
      route: '/menu', 
      submenu: [
        { label: 'Submenu Item 1', route: '/web-notifications' },
        { label: 'Submenu Item 2', route: '/web-notifications/subitem2' }
      ]
    }
  ];

  selectedLabel: string | null = null;
  currentUrl: string = '';
  
  // A new property to track the open/closed state of each submenu
  openSubmenus: { [key: string]: boolean } = {};

  constructor(private layoutService: LayoutService, private router: Router) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
    this.setSelectedLabelFromRoute();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setSelectedLabelFromRoute();
    });
  }

  selectItem(label: string): void {
    this.selectedLabel = label;
  }

  private setSelectedLabelFromRoute(): void {
    this.currentUrl = this.router.url;

    if (this.currentUrl === '/home') {
      this.selectedLabel = null;
      return;
    }

    const selectedItem = this.menuItems.find(item => this.currentUrl.startsWith(item.route));
    if (selectedItem) {
      this.selectedLabel = selectedItem.label;
    }
  }

  isActive(item: any): boolean {
    return this.currentUrl.startsWith(item.route);
  }

  isSubmenuActive(subItemRoute: string): boolean {
    return this.currentUrl.startsWith(subItemRoute);
  }

  // Toggle the submenu visibility for the clicked item
  toggleSubmenu(label: string): void {
    this.openSubmenus[label] = !this.openSubmenus[label];
  }

  // Check if the submenu is open
  isSubmenuOpen(label: string): boolean {
    return !!this.openSubmenus[label];
  }
}
