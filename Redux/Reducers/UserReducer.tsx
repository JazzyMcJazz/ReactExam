import {User} from "../../entities/user/User";
import {UPDATE_USER} from "../Actions/UserActions";

export interface UserState {
    isAuthenticated: boolean,
    loggedInUser: User,
}

const initialState: UserState = {
    isAuthenticated: false,
    loggedInUser: {} as User,
}

interface UserAction {
    type: string,
    payload: User | Function,
}

export const userReducer = (
    state: UserState = initialState,
    action: UserAction) => {

    let user;
    let newState;

    switch (action.type) {
        case UPDATE_USER:
            user = action.payload as User;
            newState = {...state, loggedInUser: user, isAuthenticated: !!user.idToken};
            return newState;

        default:
            return state;
    }
}