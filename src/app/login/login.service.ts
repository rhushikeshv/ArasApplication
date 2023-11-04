import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';
import {LoginModel} from "./LoginModel";
import {LoginResult} from "./LoginResult";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient: HttpClient;

  isAuthenticated: boolean = false;

  private loginResult!: LoginResult;
   constructor(private handler: HttpBackend,private router:Router) {
    this.httpClient = new HttpClient(handler);
  }


  public getUserRoles():Array<string> {
     return this.loginResult.roles;
  }


  public login(loginModel: LoginModel): Boolean {
    let outcome:Boolean = false;
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    /*let body = 'grant_type=' + "password" +
      '&scope=' + "Innovator" +
      '&client_id=' + "IOMApp" +
      '&username=' + loginname +
      "&password=" + password +
      "&database=" + database*/

    this.httpClient.post('https://localhost:7123/api/ArasAuthentication/login', loginModel,options).subscribe({
      next: (res: any) => {
        outcome = true;
        console.log(res);
        this.loginResult = res;
        this.isAuthenticated = true;
        localStorage.setItem("username",loginModel.username);
        this.router.navigate(['/home']).then(r => console.log('navigation successful'));
      },
      error: (error) => {
        console.log(error)

      },
      complete: () => {
        outcome = true;
        console.log(`done`+ outcome)
      }
    });
    return outcome;
  }



}
