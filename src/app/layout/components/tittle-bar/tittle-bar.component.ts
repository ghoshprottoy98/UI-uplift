import {Component, OnInit} from '@angular/core';
import {TitleBarService} from "./title-bar.service";


@Component({
  selector: 'app-title-bar',
  templateUrl: './tittle-bar.component.html',
  standalone: true,
  styleUrl: './tittle-bar.component.scss'
})
export class TittleBarComponent implements  OnInit{
  title = 'Default Title';

  constructor(private titleService: TitleBarService) {
  }

  ngOnInit(): void {
    this.titleService.currentTitle$.subscribe((newTitle) => {
      this.title = newTitle;
    });
  }

}
