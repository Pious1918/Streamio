import { createReducer, on } from "@ngrx/store"
import { loadUserProfileFailure, loadUserProfileSuccess, updateUserProfileFailure, updateUserProfileSuccess } from "./user.action"



///defining the globla userstate
export interface UserState{
    user:any,
    error:any
}


//the initialstate of the userState
export const initialState: UserState={
    user:null,
    error:null
}


export const userReducer = createReducer(
    
    initialState,
    on(loadUserProfileSuccess , (state, {user})=>({
        ...state,
        user,
        error:null
    })),

    on(loadUserProfileFailure, (state , {error})=>({
        ...state,
        error
    })),

    on(updateUserProfileSuccess, (state , {user})=>({
        ...state,
        user,
        error:null
    })),

    on(updateUserProfileFailure , (state , {error})=>({
        ...state,
        error
    }))
)