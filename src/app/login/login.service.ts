import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';
import {LoginModel} from "./LoginModel";
import {LoginResult} from "./LoginResult";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient;

  isAuthenticated: boolean = false;

  loginResult!: LoginResult;
   constructor(private handler: HttpBackend,private router:Router) {
    this.httpClient = new HttpClient(handler);
  }


  public getUserRoles():Array<string> {
     return this.loginResult.roles;
  }


  public login(loginModel: LoginModel): Observable<any> {
    let outcome:Boolean = false;
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post('https://localhost:7123/api/ArasAuthentication/login',
                              loginModel,options);


}

  setRoles(result: any) {
    this.loginResult.roles = result.roles;
  }
}
