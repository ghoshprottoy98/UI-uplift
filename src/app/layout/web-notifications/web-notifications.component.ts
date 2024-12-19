import { Component } from '@angular/core';
import {TitleBarService} from "../components/tittle-bar/title-bar.service";

@Component({
  selector: 'app-web-notifications',
  templateUrl: './web-notifications.component.html',
  styleUrl: './web-notifications.component.css'
})
export class WebNotificationsComponent {

  constructor(private  service: TitleBarService) {
    this.service.setTitle('Change Component Title');
  }

}
