import {Component, EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  {

  isCollapsed$ = new Observable<boolean>();
  @Output() mouseEnter = new EventEmitter<MouseEvent>();
  @Output() mouseLeave = new EventEmitter<MouseEvent>();


  constructor( private layoutService: LayoutService ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;

     }

  onMouseEnter(event: MouseEvent) {
    // Emit the event to the parent
    this.mouseEnter.emit(event);
  }

  onMouseLeave(event: MouseEvent) {
    // Emit the event to the parent
    this.mouseLeave.emit(event);
  }

}
