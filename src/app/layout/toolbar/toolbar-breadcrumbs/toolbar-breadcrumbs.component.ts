import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { LayoutService} from '../../layout.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';
@Component({
  selector: 'app-toolbar-breadcrumbs',
  templateUrl: './toolbar-breadcrumbs.component.html',
  styleUrl: './toolbar-breadcrumbs.component.css'
})
export class ToolbarBreadcrumbsComponent  implements OnInit {

  isCollapsed$ = new Observable<boolean>();
  breadcrumbs: Array<{ label: string, link: string }> = [];

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private breadcrumbService: BreadcrumbService 
  ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;

    this.breadcrumbService.traversedTitles$.subscribe((titles) => {
      if (titles.length > 0) {
        this.breadcrumbs = titles.map((title, index) => ({
          label: title,
          link: index === titles.length - 1 ? this.router.url : ''
        }));
      }
    });

  }

}
