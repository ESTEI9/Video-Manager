import { User } from "../types/user";

export namespace UserActions {
    export class Set {
        static readonly type = '[User] SetUser';
        constructor(public user: User) {}
    }
}