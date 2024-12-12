import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isCollapsed$ = new Observable<boolean>();

  constructor(private layoutService: LayoutService ) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;


  }
}
