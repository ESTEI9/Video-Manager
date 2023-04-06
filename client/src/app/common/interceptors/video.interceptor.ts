import { inject } from "@angular/core";
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { of } from "rxjs";
import { UserService } from "../services/user/user.service";
import { HttpErrors } from "../types/http.errors";
import { environment } from "src/environments/environment";

export function VideoInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
    const exceptions: string[] = ['login', 'createUser'];
    const userService = inject(UserService);
    const isAllowedUrl: boolean = exceptions.some(ex => req.url === `${environment.apiBaseUrl}/${ex}`);

    if (isAllowedUrl) return next(req);
    if (userService.isValidSession()) return next(req);

    userService.logout();
    return of(HttpErrors.SessionError(req));
}