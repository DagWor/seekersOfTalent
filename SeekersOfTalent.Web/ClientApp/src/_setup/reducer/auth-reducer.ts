import { Reducer } from 'redux'
import { AuthActions } from '../actions/actionTypes'
import AuthState from './../../_state_model/auth-state'

let initialState : AuthState={
    loading:false,
    authenticated:false,
    error:false,
    message:'',
    session:null
}

export const authReducer: Reducer<AuthState> = (state = initialState,action): AuthState => {
    switch(action.type){
        case AuthActions.LOGIN_REQUEST_LOADING:
          return {...state,...{loading:true,error:false,authenticated:false,message:action.message}}
        case AuthActions.LOGIN_REQUEST_ERROR:
           return {...state,...{loading:false,error:true,authenticated: false,message: action.message}}
        case AuthActions.LOGIN_REQUEST_SUCCESS:
           return {...state, ...{ loading:false,error:false,authenticated: true,message : action.message,session:action.session}}  

        case AuthActions.LOGOUT_REQUEST_LOADING:
         return {...state, ...{ loading:false,error:false,message : action.message}}  
         case AuthActions.LOGOUT_REQUEST_ERROR:
            return {...state, ...{ loading:false,error:true,message : action.message}}  
         case AuthActions.LOGOUT_REQUEST_SUCCESS:
            return {...state, ...{ loading:false,error:false,authenticated: false,message : '',session:null}}  
           

        default:
           return state  
    }
}