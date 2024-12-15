import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isCollapsed$ = new Observable<boolean>();
  breadcrumbs: Array<{ label: string, link: string }> = [];
  menuItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private layoutService: LayoutService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
    this.loadMenuItems();

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.route.root);
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

  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string, link: string }> = []): Array<{ label: string, link: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      breadcrumbs.unshift({ label: 'Home', link: '/' });
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL) {
        const matchedItem = this.findMenuItemByUrl(routeURL);
        if (matchedItem) {
          // Find the full path including parent items
          this.addBreadcrumbsForItem(matchedItem, breadcrumbs, url);
        }
        return this.createBreadcrumbs(child, url + '/' + routeURL, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

  private addBreadcrumbsForItem(item: any, breadcrumbs: Array<{ label: string, link: string }>, currentUrl: string): void {
    // Build breadcrumb from the top level, considering parent-child relationships
    const breadcrumbPath: Array<{ label: string, link: string }> = [];
    let currentItem = item;

    // Loop through the parent items until we hit the top level
    while (currentItem) {
      breadcrumbPath.unshift({ label: currentItem.title, link: currentUrl });
      currentUrl = currentItem.parentId ? currentUrl.replace(currentItem.href, '') : currentUrl;
      currentItem = currentItem.parentId ? this.findMenuItemById(currentItem.parentId) : null;
    }

    breadcrumbPath.forEach(crumb => {
      breadcrumbs.push(crumb);
    });
  }

  private findMenuItemById(id: number): any {
    return this.menuItems.find(item => item.id === id);
  }

  private findMenuItemByUrl(url: string): any {
    let item = this.menuItems.find(item => item.href.includes(url));
    if (!item) {
      for (let menuItem of this.menuItems) {
        item = menuItem.submenu?.find((subItem: { href: string | string[]; }) => subItem.href.includes(url));
        if (item) break;
      }
    }
    return item;
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
  }
}
