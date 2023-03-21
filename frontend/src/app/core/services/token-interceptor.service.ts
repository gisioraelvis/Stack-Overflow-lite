import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url !== `${API_URL}/auth/login`) {
      const token = localStorage.getItem('token') as string;
      let modifiedReq = req.clone({
        headers: new HttpHeaders()
          .append('token', token)
          .append('Custom', 'Just see Me'),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
