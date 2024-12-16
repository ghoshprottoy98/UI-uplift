import {Component, computed, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {LayoutService} from '../layout.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MenuService} from "../../../shared/services/menu-service";
import {list} from "postcss";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed$: Observable<any> | undefined;
  loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  menuItems: any[] = [];
  selectedLabel: string | null = null;
  currentUrl: string = '';
  openSubmenus: { [key: string]: boolean } = {};


  count: WritableSignal<any> = signal(null);

  activeParentId: Signal<any> = computed(() => {
    return this.menuItems.find((item: any) => {
      return item.children.find((child: any) => child.id === this.count());
    })?.id || null;
  });

  openMenuIndex: number | null = null;
  protected readonly Array = Array;
  protected readonly list = list;

  constructor(
    private layoutService: LayoutService,
    private service: MenuService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects
        if (this.menuItems.length){
          let currentParentId = this.findParentId(event.urlAfterRedirects, this.menuItems);
          this.count.set(currentParentId); // Update the current URL on navigation
        }
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
        // this.closeAllSubmenus();
      }
    });
  }


  loadMenuItems(): void {
    this.service.ownMenu()
      .pipe(
        tap((data: any) => {
          const menuMap: any = {};
          data.forEach((item: any) => {
            item.children = [];
            menuMap[item.id] = item;
          });
          data.forEach((item: any) => {
            if (item.parentId !== null) {
              menuMap[item.parentId]?.children.push(item);
            }
          });
          this.menuItems = data.filter((item: any) => item.parentId === null)
            .sort((a: any, b: any) => a.menuOrder - b.menuOrder);

          let currentParentId = this.findParentId(this.currentUrl, this.menuItems);

          this.count.set(currentParentId)
          this.loaderSubject.next(false);
        })
      )
      .subscribe({
        next: () => {
          // this.router.events.subscribe((event) => {
          //   if (event instanceof NavigationEnd) {
          //     // console.log(this.menuItems);
          //     let currentParentId = this.findParentId(event.urlAfterRedirects, this.menuItems);
          //     console.log(currentParentId)
          //     this.count.set(205); // Update the current URL on navigation
          //   }
          // });
        },
        error: (err) => {
          console.error('Error loading menu items:', err);
          this.loaderSubject.next(false); // Ensure loader stops even if there's an error
        }
      });
  }

  findParentId(url: string, menuItems: any[], parentId: any = null): any {
    for (const item of menuItems) {
      if (item.routerLink === url) {
        return parentId;
      }

      if (item.children && item.children.length > 0) {
        const result = this.findParentId(url, item.children, item.id); // Pass current item's ID as the parentId
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
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

  onMouseEnter(event: MouseEvent){
    this.layoutService.isCollapsed$.subscribe((item=>{
      if (item){
       // this.layoutService.toggleSidebar()
      }
    }))

    // this.layoutService.toggleSidebar()
  }

  onMouseLeave(event: MouseEvent){
    // this.layoutService.toggleSidebar()
  }
}
