import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed$: Observable<boolean> | undefined;
  menuItems: any[] = [];
  selectedLabel: string | null = null;
  currentUrl: string = '';
  openSubmenus: { [key: string]: boolean } = {};

  constructor(
    private layoutService: LayoutService, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
    this.setSelectedLabelFromRoute();
    this.loadMenuItems();

    const storedSelectedLabel = sessionStorage.getItem('selectedLabel');
    if (storedSelectedLabel) {
      this.selectedLabel = storedSelectedLabel;
    }

    const storedSubmenus = sessionStorage.getItem('openSubmenus');
    if (storedSubmenus) {
      this.openSubmenus = JSON.parse(storedSubmenus);
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setSelectedLabelFromRoute();
    });

    // Listen for layout toggle changes to close all submenus
    this.layoutService.isCollapsed$.subscribe(isCollapsed => {
      if (isCollapsed) {
        this.closeAllSubmenus();
      }
    });
  }

  loadMenuItems(): void {
    this.http.get<any[]>('./assets/data.json').subscribe(data => {
      const menuMap: { [key: number]: any } = {};
      data.forEach(item => {
        item.submenu = [];
        menuMap[item.id] = item;
      });
      data.forEach(item => {
        if (item.parentId !== null) {
          menuMap[item.parentId].submenu.push(item);
        }
      });
      this.menuItems = data.filter(item => item.parentId === null).sort((a, b) => a.menuOrder - b.menuOrder);
    });
  }

  selectItem(label: string, href: string): void {
    // If the sidebar is collapsed, expand it
    if (this.isCollapsed$) {
      this.layoutService.setCollapseState(false); // Expanding the sidebar
    }

    this.selectedLabel = label;
    sessionStorage.setItem('selectedLabel', label);  
    
    // Navigate to the selected item
    this.router.navigate([href]);

    // Close all other submenus
    this.closeOtherSubmenus(label);
  }

  private closeOtherSubmenus(label: string): void {
    // Close all submenus except the one that was clicked
    Object.keys(this.openSubmenus).forEach(key => {
      if (key !== label) {
        this.openSubmenus[key] = false;
      }
    });
    // Save the updated state of the submenus
    sessionStorage.setItem('openSubmenus', JSON.stringify(this.openSubmenus));
  }

  private closeAllSubmenus(): void {
    // Close all submenus
    this.openSubmenus = {};
    sessionStorage.setItem('openSubmenus', JSON.stringify(this.openSubmenus));
  }

  private setSelectedLabelFromRoute(): void {
    this.currentUrl = this.router.url;

    if (this.currentUrl === '/home') {
      this.selectedLabel = null;
      sessionStorage.removeItem('selectedLabel');  
      return;
    }

    const selectedItem = this.menuItems.find(item => this.currentUrl.startsWith(item.href));
    if (selectedItem) {
      this.selectedLabel = selectedItem.title;
      sessionStorage.setItem('selectedLabel', selectedItem.title);  
    }
  }

  isActive(item: any): boolean {
    return this.currentUrl.startsWith(item.href);
  }

  isSubmenuActive(subItemRoute: string): boolean {
    return this.currentUrl.startsWith(subItemRoute);
  }

  toggleSubmenu(label: string): void {
    // Toggle the specific submenu and close other submenus
    if (this.openSubmenus[label]) {
      this.openSubmenus[label] = false; // Close if it's already open
    } else {
      this.openSubmenus[label] = true; // Open the clicked submenu
      this.closeOtherSubmenus(label); // Ensure all other submenus are closed
    }

    sessionStorage.setItem('openSubmenus', JSON.stringify(this.openSubmenus));
  }

  isSubmenuOpen(label: string): boolean {
    return !!this.openSubmenus[label];
  }

  // Handle mouse hover behavior to open/close sidebar
  onMouseEnter(): void {
    if (this.isCollapsed$) {
      this.layoutService.setCollapseState(false); // Expanding the sidebar when hovering
    }
  }

  onMouseLeave(): void {
    if (this.isCollapsed$) {
      this.layoutService.setCollapseState(true); // Collapsing the sidebar after mouse leave
    }
  }
}
