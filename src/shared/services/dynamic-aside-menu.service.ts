import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MenuService} from './menu-service';
import {map} from 'rxjs/operators';
import {buildHierarchy, isEmpty, isNotEmpty} from "@bracit/common-utils";
import {KTMenuItem, Menu} from "../domain/menu";
import {RouterWrapper} from "./router-wrapper.service";

const emptyMenuConfig = {
  items: []
};

let currentModule = location.pathname.split('/')[1];

if(isEmpty(currentModule)) {
  currentModule = 'app'
}

@Injectable({
  providedIn: 'root'
})
export class DynamicAsideMenuService {
  private loaded = false;
  private loading: Promise<any> | null | undefined;
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;
  menuItemsByPath: { [key: string]: Menu } = {};
  menuItemsById: { [key: string]: Menu } = {};

  constructor(private service: MenuService, private router: RouterWrapper) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.onReady().then(() => {
      this.loaded = true;
      this.loading = null;
    });
  }

  onReady(): Promise<any> {
    if (this.loading) {
      return this.loading;
    }

    if (this.loaded) {
      return Promise.resolve();
    }

    this.loading = this.loadMenu();

    return this.loading;
  }

  getCurrentModule(): string | undefined {
    if (isEmpty(currentModule)) {
      return undefined;
    }

    return currentModule;
  }

  private loadMenu() {
    if (isEmpty(currentModule)) {
      return Promise.resolve();
    }
    return new Promise(resolve => {
      this.service.ownMenu()
      .pipe(map(list => list.filter(i => i.module === currentModule).map(m => {
        if (isNotEmpty(m.routerLink)) {
          // @ts-ignore
          this.menuItemsByPath[m.routerLink] = m;
        }
        this.menuItemsById[m.id + ''] = m;
        return new KTMenuItem(
            m.id,
            m.title,
            m.parentId == null,
            m.parentId,
            m.icon,
            m.iconType,
            m.routerLink,
            m.module
        );
      })))
      .subscribe(l => {
        // @ts-ignore
        const tree = buildHierarchy(l);
        this.setMenu({items: tree});
        resolve(null);
      });
    });
  }

  public isMenuItemActive(current: PropertyKey, id: PropertyKey | undefined) {
    if (!this.menuItemsById.hasOwnProperty(<string | number | symbol>id)) {
      return false;
    }

    if (this.menuItemsByPath.hasOwnProperty(current)) {
      // @ts-ignore
      const menu = this.menuItemsByPath[current];
      return menu.id === id || this.isParentOrGrandParent(menu, id);
    }

    const routeData = this.router.getRouteData();

    if (routeData && routeData.hasOwnProperty('parentUrl')) {
      const menu = this.getMenuByPath(routeData.parentUrl);
      if (menu && menu.id === id || this.isParentOrGrandParent(menu, id)) {
        return true;
      }
    }

    return false;
  }

  private isParentOrGrandParent(menu: Menu | null, id: PropertyKey | undefined) {
    if(menu == null || menu.parentId == null) {
      return false;
    }

    if(menu.parentId === id) {
      return true;
    }

    return this.menuItemsById[menu.parentId].parentId === id;
  }

  public getParentTree(menu: Menu|null):any {

    if (menu === null) {
      return [];
    }

    if (menu.parentId === null) {
      return [menu];
    }

    const parentMenu = this.getMenuById(menu.parentId);
    if (parentMenu) {
      return [...this.getParentTree(parentMenu), menu];
    } else {
      return [menu];
    }
  }

  public getMenuByPath(url: string) {
    if (this.menuItemsByPath.hasOwnProperty(url)) {
      return this.menuItemsByPath[url];
    }
    return null;
  }

  private setMenu(menuConfig: { items: any[]; }) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenuById(parentId: PropertyKey | undefined) {
    if (this.menuItemsById.hasOwnProperty(<string | number | symbol>parentId)) {
      // @ts-ignore
      return this.menuItemsById[parentId];
    }
    return null;
  }
}
