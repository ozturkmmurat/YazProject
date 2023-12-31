import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  user:User

  constructor(private localStorageService : LocalStorageService,
    private userService : UserService,
    private router : Router) {
     this.loadingUser()
  }


  loadingUser(){
    effect(() => {
      this.user = this.userService._user();
      console.log("NavbarComponent'teki user", this.user);
    });
  }

  logOut(){
    this.localStorageService.removeTokens()
    this.userService._user.set(null);
    this.router.navigate(["login"]);
  }
}
