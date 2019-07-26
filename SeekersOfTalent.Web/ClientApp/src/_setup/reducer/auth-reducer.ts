import { Reducer } from 'redux'
import { AuthActions } from '../actions/actionTypes'
import AuthState from './../../_state_model/auth-state'

let initialState : AuthState={
    loading:false,
    authenticated:false,
    error:false,
    message:'Testing Redux success',
    session:null
}

export const authReducer: Reducer<AuthState> = (state = initialState,action): AuthState => {
    switch(action.type){
        case AuthActions.AUTH_REQUEST_LOADING:
          return {...state,...{loading:true,error:false,authenticated:false,message:action.message}}
        case AuthActions.AUTH_REQUEST_ERROR:
           return {...state,...{loading:false,error:true,authenticated: false,message: action.message}}
        case AuthActions.AUTH_REQUEST_SUCCESS:
           return {...state, ...{ loading:false,error:false,authenticated: true,message : action.message,session:action.session}}  
        default:
           return state  
    }
}