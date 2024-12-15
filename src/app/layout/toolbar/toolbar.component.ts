import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isCollapsed$ = new Observable<boolean>();

  breadcrumbs: Array<{ label: string, link: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.route.root);
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string, link: string }> = []
  ): Array<{ label: string, link: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      // Add Home as the first breadcrumb
      breadcrumbs.unshift({ label: 'Home', link: '/' });
      return breadcrumbs;
    }

    for (let child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL) {
        const label = this.getLabel(routeURL);
        const link = url + '/' + routeURL;
        breadcrumbs.push({ label, link });
        return this.createBreadcrumbs(child, link, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

  private getLabel(route: string): string {
    switch (route) {
      case 'layouts':
        return 'Layouts';
      case 'templates':
        return 'Templates';
      case 'sms-email-notification-history':
        return 'SMS/Email Notification History';
      case 'web-notifications':
        return 'Web Notifications';
      default:
        return this.capitalize(route);
    }
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
  }
}
