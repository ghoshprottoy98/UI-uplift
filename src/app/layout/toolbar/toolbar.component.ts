import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LayoutService} from '../layout.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../../../shared/services/auth-service";

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
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
    this.loadMenuItems();

    const storedBreadcrumbs = sessionStorage.getItem('breadcrumbs');
    if (storedBreadcrumbs) {
      this.breadcrumbs = JSON.parse(storedBreadcrumbs);
    }

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.route.root);
      sessionStorage.setItem('breadcrumbs', JSON.stringify(this.breadcrumbs));
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

  createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{
    label: string,
    link: string
  }> = []): Array<{ label: string, link: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      breadcrumbs.unshift({label: 'Home', link: '/'});
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL) {
        const matchedItem = this.findMenuItemByUrl(routeURL);
        if (matchedItem) {
          this.addBreadcrumbsForItem(matchedItem, breadcrumbs, url);
        }
        return this.createBreadcrumbs(child, url + '/' + routeURL, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

  logOut() {
    this.authService.logout()
  }

  private addBreadcrumbsForItem(item: any, breadcrumbs: Array<{
    label: string,
    link: string
  }>, currentUrl: string): void {
    // Build breadcrumb from the top level, considering parent-child relationships
  // private addBreadcrumbsForItem(item: any, breadcrumbs: Array<{ label: string, link: string }>, currentUrl: string): void {
  //   const breadcrumbPath: Array<{ label: string, link: string }> = [];
  //   let currentItem = item;

  //   while (currentItem) {
  //     breadcrumbPath.unshift({label: currentItem.title, link: currentUrl});
  //     currentUrl = currentItem.parentId ? currentUrl.replace(currentItem.href, '') : currentUrl;
  //     currentItem = currentItem.parentId ? this.findMenuItemById(currentItem.parentId) : null;
  //   }

  //   breadcrumbPath.forEach(crumb => {
  //     breadcrumbs.push(crumb);
  //   });
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
