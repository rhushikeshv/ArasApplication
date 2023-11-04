import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {inject, runInInjectionContext} from "@angular/core";
import {LoginService} from "./login/login.service";

export const roleGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router : Router = inject(Router)
  let outcome: boolean = false;
  console.log("Auth guard activation called for roles ",route.data['roles']);
  if(loginService.isAuthenticated)
  {
    let roles = loginService.getUserRoles();
    console.log(roles);
    let rolesFromGuard = route.data['roles'] as Array<string>;
   for (let roleIdx in rolesFromGuard){
      if(roles.includes(rolesFromGuard[roleIdx])){
        outcome = true;
        break;
      }
    }
  }
  return outcome;
};
