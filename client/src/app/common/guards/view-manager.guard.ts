import { inject } from "@angular/core";
import { UserService } from "../services/user/user.service";

export const ManagerGuard = (): boolean => {

    const userService = inject(UserService);

    if(userService.isValidSession())
    return true;

    userService.logout();
    return false;
}