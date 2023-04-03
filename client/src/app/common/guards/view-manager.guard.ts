import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { UserService } from "../services/user/user.service";
import { SelectSnapshot } from "@ngxs-labs/select-snapshot";
import { UserState } from "../states/user.state";
import { User } from "../types/user";

@Injectable()

export class ManagerGuard implements CanActivate {

    @SelectSnapshot(UserState) user: User;

    constructor(
        private userService: UserService
    ) {}

    canActivate(): boolean {
        if(this.userService.isValidSession() === false) {
            this.userService.logout();
            return false;
        }
        return true;
    }
}