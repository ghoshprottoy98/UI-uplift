import { Component } from '@angular/core';
import { AuthService} from '../../../../shared/services/auth-service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-toolbar-profile',
  templateUrl: './toolbar-profile.component.html',
  styleUrl: './toolbar-profile.component.scss'
})
export class ToolbarProfileComponent {

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string = 'btn btn-icon position-relative btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';


  notificationList = [
    { title: 'New message received', seen: false, createdOn: new Date() },
    { title: 'New comment on your post', seen: true, createdOn: new Date() },
    { title: 'You have a new follower', seen: false, createdOn: new Date() },
    { title: 'Your order has been shipped', seen: true, createdOn: new Date() },
    { title: 'System update available', seen: false, createdOn: new Date() },
    { title: 'Password changed successfully', seen: true, createdOn: new Date() },
    { title: 'New likes on your photo', seen: false, createdOn: new Date() },
    { title: 'You have a new message', seen: true, createdOn: new Date() }
  ];
  newCount = this.notificationList.filter(alert => !alert.seen).length;
  noNotification = this.notificationList.length === 0;


 constructor(
    private authService: AuthService,
  ) {}


  viewDetails(alert: any, event: Event) {
    event.preventDefault();
    alert.seen = true; 
    this.newCount = this.notificationList.filter(alert => !alert.seen).length;
    console.log(`Viewing details for: ${alert.title}`);
  }

  viewAllNotifications() {
    console.log("Viewing all notifications...");
  }

  logOut() {
    this.authService.logout()
  }
}
