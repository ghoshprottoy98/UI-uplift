import {Component} from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {

  isCollapsed$ = new Observable<boolean>();
  

  constructor( private layoutService: LayoutService ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;

     }

     onMouseEnter(event: MouseEvent) {
      if (this.isCollapsed$) {
        this.layoutService.toggleSidebar();
      }
    }
  
    onMouseLeave(event: MouseEvent) {
      if (this.isCollapsed$) {
        this.layoutService.toggleSidebar();
      }
    }
}
