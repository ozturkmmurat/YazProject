import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService : AuthService,
    private router : Router) {
      this.loadingUser()
  }

  ngOnInit(){
  }


  loadingUser(){
    effect(() => {
      console.log("Service den gelen", this.userService._user())
      this.user = this.userService._user();
      console.log("NavbarComponent'teki user", this.user);
    });
  }

  logOut(){
    this.localStorageService.removeTokens()
    this.userService._user.set(null);
    this.router.navigate(["login"]);
  }

  getRole(){
    if(this.user != null && this.user != undefined){
      console.log("Roller", this.authService.decodeToken(this.localStorageService.getToken())['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
      return this.authService.decodeToken(this.localStorageService.getToken())['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    }
  }

  isRole(role : string) {
    const userRoles = this.getRole();
    return userRoles && Array.isArray(userRoles) && userRoles.includes(role);
  }

}
