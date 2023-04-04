import { inject } from "@angular/core";
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { of } from "rxjs";
import { UserService } from "../services/user/user.service";
import { HttpErrors } from "../types/http.errors";

export function VideoInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
    const exceptions: string[] = ['/api/login', '/api/createUser'];
    const userService = inject(UserService);

    if(exceptions.includes(req.url)) return next(req);
        if(userService.isValidSession()) return next(req);

        userService.logout();
        return of(HttpErrors.SessionError(req));
}