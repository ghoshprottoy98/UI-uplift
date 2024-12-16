import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import {MenuService} from "../../../shared/services/menu-service";
import {DynamicAsideMenuService} from "../../../shared/services/dynamic-aside-menu.service";
import {list} from "postcss";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed$: Observable<boolean> | undefined;
  loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  menuItems: any[] = [];
  selectedLabel: string | null = null;
  currentUrl: string = '';
  openSubmenus: { [key: string]: boolean } = {};

  menuConfig: any;
  subscriptions: Subscription[] = [];

  constructor(
    private layoutService: LayoutService,
    private service: MenuService,
    private router: Router,
    private menu: DynamicAsideMenuService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects; // Update the current URL on navigation
        console.log(this.currentUrl)
      }
    });



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

    this.layoutService.isCollapsed$.subscribe(isCollapsed => {
      if (isCollapsed) {
        this.closeAllSubmenus();
      }
    });
  }

  loadMenuItems(): void {
    this.service.ownMenu().subscribe((data: any) => {
      const menuMap: any = {};
      data.forEach((item: any) => {
        item.children = [];
        menuMap[item.id] = item;
      });
      data.forEach((item:any) => {
        if (item.parentId !== null) {
          menuMap[item.parentId]?.children.push(item);
        }
      });
    const x = this.menuItems =  data.filter((item: any) => item.parentId === null).sort((a: any, b: any) => a.menuOrder - b.menuOrder);

    this.loaderSubject.next(false)
    });
  }

  selectItem(label: string, href: string): void {
    if (this.isCollapsed$) {
      this.layoutService.setCollapseState(false);
    }

    this.selectedLabel = label;
    sessionStorage.setItem('selectedLabel', label);
    this.router.navigate([href]);
    this.closeOtherSubmenus(label);
  }

  private closeOtherSubmenus(label: string): void {
    Object.keys(this.openSubmenus).forEach(key => {
      if (key !== label) {
        this.openSubmenus[key] = false;
      }
    });
    sessionStorage.setItem('openSubmenus', JSON.stringify(this.openSubmenus));
  }

  private closeAllSubmenus(): void {
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

    const selectedItem = this.menuItems.find((item: { href: string; }) => this.currentUrl.startsWith(item.href));
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
    if (this.openSubmenus[label]) {
      this.openSubmenus[label] = false;
    } else {
      this.openSubmenus[label] = true;
      this.closeOtherSubmenus(label);
    }

    sessionStorage.setItem('openSubmenus', JSON.stringify(this.openSubmenus));
  }

  isSubmenuOpen(label: string): boolean {
    return !!this.openSubmenus[label];
  }

  onMouseEnter(): void {
    if (this.isCollapsed$) {
      this.layoutService.setCollapseState(false);
    }
  }

  onMouseLeave(): void {
    if (this.isCollapsed$) {
      this.layoutService.setCollapseState(true);
    }
  }


  isChildItemActive(id: PropertyKey | undefined) {
    if (!this.currentUrl) {
      return false;
    }

    return this.menu.isMenuItemActive(this.currentUrl, id);
  }

  hasActiveChild(item: any): boolean {
    return true
  }
  openMenuIndex: number | null = null;

  toggleMenu(index: number): void {
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  protected readonly Array = Array;
  protected readonly list = list;
}
