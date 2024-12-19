import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements  OnInit {
  isCollapsed$ = new Observable<boolean>();

  coverage: boolean = false;


  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.isCollapsed$ = this.layoutService.isCollapsed$;
  }

  handleMouseEnter(event: MouseEvent) {
    this.isCollapsed$.subscribe((item)=>{
      if (item){
        this.coverage = true
      }
    })
  }

  handleMouseLeave(event: MouseEvent) {
    this.isCollapsed$.subscribe((item)=>{
      if (item){
        this.coverage = false
      }
    })
  }

}
