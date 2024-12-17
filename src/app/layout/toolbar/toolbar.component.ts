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
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isCollapsed$ = new Observable<boolean>();
  breadcrumbs: Array<{ label: string, link: string }> = [];

  constructor(
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.generateBreadcrumbs();
    });

  }


  private generateBreadcrumbs(): void {
    const urlSegments = this.router.url.split('/').filter(segment => segment);

    this.breadcrumbs = [];
    let currentUrl = '';

    urlSegments.forEach((segment, index) => {
      currentUrl += `/${segment}`;
      const label = this.capitalize(segment.replace('-', ' '));
      this.breadcrumbs.push({
        label: label,
        link: currentUrl
      });
    });

    this.breadcrumbs.unshift({ label: 'Home', link: '/' });
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  logOut() {
    this.authService.logout()
  }

}
