import {inject, Injectable} from "@angular/core";
import {CanActivateChildFn, CanActivateFn, Router} from "@angular/router";
import {LoginService} from "./login/login.service";


export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router : Router = inject(Router)
  let outcome: boolean = false;
  console.log("Auth guard activation called for roles ",route.data['roles']);
  if(loginService.isAuthenticated)
  {
    outcome = true;
  }

  return outcome;
};

