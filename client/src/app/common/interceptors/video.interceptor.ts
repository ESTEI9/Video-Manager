import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { UserService } from "../services/user/user.service";
import { HttpErrors } from "../types/http.errors";

@Injectable()
export class VideoInterceptor implements HttpInterceptor {

    exceptions: string[] = ['/api/login', '/api/createUser'];

    constructor(public userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(this.exceptions.includes(req.url)) return next.handle(req);
        if(this.userService.isValidSession()) return next.handle(req);

        this.userService.logout();
        return of(HttpErrors.SessionError(req));
    }
}