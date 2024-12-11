import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed$ = new Observable<boolean>();
  menuItems = ['Layouts', 'Templates', 'SMS/Email Notification History', 'Web Notifications'];

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
  }
}
