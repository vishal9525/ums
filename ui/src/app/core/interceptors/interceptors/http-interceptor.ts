import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwtToken = localStorage.getItem("token");
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + jwtToken)
    });
    return next.handle(authRequest);
  }
}
