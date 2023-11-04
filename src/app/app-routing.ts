import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from "./login/login.component";
import {PartComponent} from "./part/part.component";
import {DrawingComponent} from "./drawing/drawing.component";
import {EcrComponent} from "./ecr/ecr.component";

import {roleGuard} from "./role.guard";
import {authGuard} from "./auth.guard";


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent,canActivate:[authGuard],
 /*   children: [
      { path: 'part', component: PartComponent ,canActivate:[roleGuard], data: {roles: ['Administrators']} },
      { path: 'drawing', component: DrawingComponent,canActivate:[roleGuard],data:{roles: ['Engineering']} },
      { path: 'ecr', component: EcrComponent,canActivate:[roleGuard],data:{roles:['Design Approver']} }
    ]*/
  }
  ]


@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
