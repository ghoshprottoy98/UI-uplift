import { Component } from '@angular/core';
import { AuthService} from '../../../../shared/services/auth-service';
@Component({
  selector: 'app-toolbar-profile',
  templateUrl: './toolbar-profile.component.html',
  styleUrl: './toolbar-profile.component.scss'
})
export class ToolbarProfileComponent {

 constructor(
    private authService: AuthService,
  ) {}

  logOut() {
    this.authService.logout()
  }
}
