import { Injectable } from '@angular/core';
import { SingleResponseModel } from '../core/models/responseModel/singleResponseModel';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/token/tokenModel';
import { LocalStorageService } from './localStorage/local-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user/user';
import { UserForLoginDto } from '../models/auth/loginModel';
import { RegisterModel } from '../models/auth/registerModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentTokenUser$ = new BehaviorSubject<User>(null);
  user: User
  jwtHelper: JwtHelperService = new JwtHelperService();
  userToken: any;
  decodedToken: any;


  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  logOut() {
    this.localStorageService.signOut();
    this.router.navigate(["/login"]);
  }

  refreshTokenLogin(tokenModel: string) {
    console.log("İstek yollandı", tokenModel)
    let newPath = environment.apiUrl + "auth/refreshTokenLogin?refreshToken=" + tokenModel
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, null)
  }

  login(loginModel: UserForLoginDto) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "auth/login", loginModel)
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "auth/register", registerModel)
  }


  decodeToken(token: string) {
    if(token !=null){
      console.log("Decode token", this.jwtHelper.decodeToken(token))
      return this.jwtHelper.decodeToken(token);
    }
  }
}
