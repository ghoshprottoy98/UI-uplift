import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-test-component',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
  ]
})
export class ChildComponent {
  title = 'Welcome to the New Feature!';
}
