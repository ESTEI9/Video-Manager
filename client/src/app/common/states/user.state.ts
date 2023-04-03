import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { User } from "../types/user";
import { UserActions } from "../actions/user.actions";

@State<User>({
    name: 'user',
    defaults: new User()
})

@Injectable()
export class UserState {

    @Action(UserActions.Set)
    setUser(context: StateContext<User>, action: UserActions.Set) {
        const date = new Date().toISOString();
        context.setState({...action.user, date});
    }
}