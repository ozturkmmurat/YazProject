import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { LocalStorageService } from './services/localStorage/local-storage.service';
import { UserService } from './services/user/user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YazProject';

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.loadUser()
  }


  loadUser() {
    if (this.localStorageService.getToken != null) {
      this.userService.setCurrentUser()
    }
    else {
      this.authService.logOut()
    }
  }
}
