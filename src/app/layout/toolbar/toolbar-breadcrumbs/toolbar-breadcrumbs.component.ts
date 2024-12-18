import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../layout.service';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'app-toolbar-breadcrumbs',
  templateUrl: './toolbar-breadcrumbs.component.html',
  styleUrl: './toolbar-breadcrumbs.component.css'
})
export class ToolbarBreadcrumbsComponent implements OnInit {
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
          link: index === titles.length - 1 ? this.router.url : this.getLinkForBreadcrumb(index, titles)
        }));
      } else {
        this.breadcrumbs = [];
      }
    });
  }

  isHomePage(): boolean {
    return this.router.url.endsWith('/home');
  }


  getLinkForBreadcrumb(index: number, titles: string[]): string {
    let link = '/';
    for (let i = 0; i <= index; i++) {
      link += titles[i].toLowerCase().replace(/\s+/g, '-');
      if (i < index) link += '/'; 
    }
    return link;
  }

  onBreadcrumbClick(link: string): void {
    this.router.navigateByUrl(link).then(() => {
      this.breadcrumbService.updateTraversedTitles(this.breadcrumbs.map(breadcrumb => breadcrumb.label));
    });
  }
}
