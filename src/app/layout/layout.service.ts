import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private isCollapsedSubject = new BehaviorSubject<boolean>(false);
  isCollapsed$ = this.isCollapsedSubject.asObservable();

  toggleSidebar() {
    this.isCollapsedSubject.next(!this.isCollapsedSubject.value);
  }

  setCollapseState(isCollapsed: boolean): void {
    this.isCollapsedSubject.next(isCollapsed);
  }

  setSidebarState(isCollapsed: boolean) {
    this.isCollapsedSubject.next(isCollapsed);
  }
}
