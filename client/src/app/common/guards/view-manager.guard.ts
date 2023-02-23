import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "../services/user/user.service";

@Injectable()

export class ManagerGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    canActivate(): boolean {
        if(this.userService.user.id === 0) {
            this.router.navigateByUrl('');
            return false;
        }
        return true;
    }
}