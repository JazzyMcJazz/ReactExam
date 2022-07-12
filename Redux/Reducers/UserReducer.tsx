import {User} from "../../entities/user/User";
import {LOGIN, LOGOUT, RESTORE_AUTH, SIGNUP} from "../Actions/UserActions";

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
        case SIGNUP:
        case LOGIN:
        case RESTORE_AUTH:
        case LOGOUT:
            user = action.payload as User;
            newState = {...state, loggedInUser: user, isAuthenticated: !!user.idToken};
            return newState;

        default:
            return state;
    }
}