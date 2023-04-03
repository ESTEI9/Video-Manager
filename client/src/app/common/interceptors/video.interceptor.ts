import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { UserService } from "../services/user/user.service";
import { HttpErrors } from "../types/http.errors";

@Injectable()
export class VideoInterceptor implements HttpInterceptor {

    constructor(public userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.userService.isValidSession() || req.url.includes('/api/login')) return next.handle(req);

        this.userService.logout();
        return of(HttpErrors.SessionError(req));
    }
}