import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing";
import {BlockUI, BlockUIModule} from "primeng/blockui";
import {PanelModule} from "primeng/panel";
import {SliderModule} from "primeng/slider";
import {SlideMenuModule} from "primeng/slidemenu";
import {TabMenuModule} from "primeng/tabmenu";
import { PartComponent } from './part/part.component';
import { DrawingComponent } from './drawing/drawing.component';
import { EcrComponent } from './ecr/ecr.component';
import {ArasRestApiInterceptorInterceptor} from "./aras-rest-api-interceptor.interceptor";
import {TableModule} from "primeng/table";
import {Card, CardModule} from "primeng/card";
import {LoginService} from "./login/login.service";
import {RoleBasedDirective} from "./directive/RoleBasedDirective";
import {StyleClassModule} from "primeng/styleclass";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {RatingModule} from "primeng/rating";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PaginatorModule} from "primeng/paginator";
import {RadioButtonModule} from "primeng/radiobutton";
import {MessageService} from "primeng/api";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PartComponent,
    DrawingComponent,
    EcrComponent,
    RoleBasedDirective

  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,useClass: ArasRestApiInterceptorInterceptor,multi:true,
    }
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    AppRoutingModule,
    BlockUIModule,
    PanelModule,
    SlideMenuModule,
    TabMenuModule,
    TableModule,
    CardModule,
    StyleClassModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    RatingModule,
    DialogModule,
    ConfirmDialogModule,
    PaginatorModule,
    RadioButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
