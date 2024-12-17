import { Component } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-sidebar-logo',
  templateUrl: './sidebar-logo.component.html',
  styleUrl: './sidebar-logo.component.css'
})
export class SidebarLogoComponent {

  isCollapsed$ = new Observable<boolean>();
  
constructor( private layoutService: LayoutService) {}

ngOnInit(): void {
  this.isCollapsed$ = this.layoutService.isCollapsed$;
}
}
