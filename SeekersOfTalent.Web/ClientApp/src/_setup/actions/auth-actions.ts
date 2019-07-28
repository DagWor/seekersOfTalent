import { ActionCreator, Action } from "redux"
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import AuthService from './../services/auth.service'
import { LoginViewModel } from "../../_view_model/login-view-model";
import { AuthActions } from "./actionTypes";
import { UserSession } from "../../_view_model/session";


const auth_service  = new AuthService()

function requestLogin(message:string){
  return {type:AuthActions.AUTH_REQUEST_LOADING,message}
}
function loginSuccess(session:UserSession){
  return {type:AuthActions.AUTH_REQUEST_SUCCESS,session}
}
function loginError(message:string){
  return {type:AuthActions.AUTH_REQUEST_ERROR,message}
}

export const validateCredential: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (data:LoginViewModel) => {
    return async (dispatch:any):Promise<Action> => {
      dispatch(requestLogin('Validating credential, Please wait...'))
      return auth_service.validateCredention(data)
      .then(response=>{  
        dispatch(loginSuccess(response.data))  
        return response.data;  

      })
      .catch(error=>
        {
          if(!axios.isCancel(error)){
            dispatch(loginError(error.message))
          } 
        })
    }
}

export const checkSession: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = () => {
    return async (dispatch:any):Promise<Action> => {
      dispatch(requestLogin('Validating session, Please wait...'))
      return auth_service.checkSessionValidity()
      .then(response=>{  
        console.log('Valid Session',response.data)
        dispatch(loginSuccess(response.data))  
        return response.data;  

      })
      .catch(error=>
        {
          if(!axios.isCancel(error)){
            dispatch(loginError(error.message))
          } 
        })
    }
}