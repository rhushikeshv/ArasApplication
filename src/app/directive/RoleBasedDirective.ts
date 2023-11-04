// role-based.directive.ts

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {LoginService} from "../login/login.service";


@Directive({
  selector: '[appRoleBased]'
})
export class RoleBasedDirective {
  @Input() set appRoleBased(role: string | string[]) {
    const userRole = this.loginService.getUserRoles();

    if(userRole && userRole.includes(<string>role)){
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainer.clear();
    }
   /* if (userRole && (Array.isArray(role) ? role.includes(userRole) : role === userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }*/
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) {}
}
