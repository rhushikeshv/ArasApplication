import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {PartService} from "./part/part.service";

@Injectable()
export class ArasRestApiInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor called ");
    console.log(localStorage.getItem('username'))
    const username = localStorage.getItem('username') ?? '{}';
    console.log(username);
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
        .set('username', username)
    });
    return next.handle(req);
  }
}
