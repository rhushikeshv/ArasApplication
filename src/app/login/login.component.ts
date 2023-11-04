import { Component } from '@angular/core';
import {Md5} from "ts-md5";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "./login.service";
import {LoginModel} from "./LoginModel";

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


  constructor(private loginService:LoginService) {
  }
  ngOnInit(){
    this.databases = [
      { name: 'InnovatorSolutions'},
    ];
  }

  onSubmit() {
    /*if (typeof this.password === "string") {
      const md5:Md5 = new Md5();
      this.password = md5.appendStr(this.password).end();
    }*/



    //let postData:any = JSON.parse(body);
    console.log(this.password);
    this.blockedPanel=true;

    let loginData: LoginModel = new LoginModel();
    loginData.username = this.loginName;
    loginData.password = this.password;
    loginData.database = this.selectedDatabase.name;
    loginData.hostname = this.hostname;
    loginData.connection = this.connection;
    const outcome = this.loginService.login(loginData)
    if(outcome)
    {
      //navigate to the next home component
      console.log('login successful')
    }


  }


}
interface Database {
  name: string;
}
