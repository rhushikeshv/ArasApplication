import { Component } from '@angular/core';
import {Md5} from "ts-md5";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {LoginModel} from "./LoginModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginName: string="";
  password: string="";
  databases:Database[] | any;
  selectedDatabase: Database | any;
  blockedPanel: boolean = false ;
  hostname: string ="";
  connection: string  ="";
  blockedProgress!: boolean;


  constructor(private loginService:LoginService,private router:Router) {
  }
  ngOnInit(){
    this.databases = [
      { name: 'InnovatorSolutions'},
    ];
  }

  onSubmit() {
    this.blockedPanel=true;
    this.blockedProgress =true;
    let loginData: LoginModel = new LoginModel();
    loginData.username = this.loginName;
    loginData.password = this.password;
    loginData.database = this.selectedDatabase.name;
    loginData.hostname = this.hostname;
    loginData.connection = this.connection;
    this.loginService.login(loginData).subscribe(result=>{
      console.log(result);
      this.blockedPanel = false;
      this.blockedProgress = false;
      this.loginService.isAuthenticated=true;
      this.loginService.loginResult=result;
      this.router.navigate(['/home']);
    });



  }


}
interface Database {
  name: string;
}
