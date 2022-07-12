import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./Reducers/UserReducer";

const rootReducer = combineReducers( {
    user: userReducer
})

const stores = configureStore({reducer: rootReducer});

export default stores;