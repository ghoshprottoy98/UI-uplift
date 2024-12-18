import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FuseFullscreenModule} from "@bracit/angular/fullscreen";



@Component({
  selector: 'app-test-component',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FuseFullscreenModule,
  ]
})
export class ChildComponent {
  title = 'Welcome to the New Feature!';
}
