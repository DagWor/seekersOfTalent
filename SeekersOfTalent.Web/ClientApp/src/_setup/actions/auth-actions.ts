import { ActionCreator, Action } from "redux"
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import AuthService from './../services/auth.service'
import { LoginViewModel } from "../../_view_model/login-view-model";
import { AuthActions } from "./actionTypes";
import { UserSession } from "../../_view_model/session";
import {closeModal, errorModal, loadingModal} from "./loading-modal-actions";


const auth_service  = new AuthService()

function requestLogin(message:string){
  return {type:AuthActions.LOGIN_REQUEST_LOADING,message}
}
function loginSuccess(session:UserSession){
  return {type:AuthActions.LOGIN_REQUEST_SUCCESS,session}
}
function loginError(message:string){
  return {type:AuthActions.LOGIN_REQUEST_ERROR,message}
}


function requestLogout(message:string){
  return {type:AuthActions.LOGOUT_REQUEST_LOADING,message}
}
function logoutSuccess(){
  return {type:AuthActions.LOGOUT_REQUEST_SUCCESS}
}
function logoutError(message:string){
  return {type:AuthActions.LOGOUT_REQUEST_ERROR,message}
}


export const validateCredential: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (data:LoginViewModel) => {
    return async (dispatch:any):Promise<Action> => {
      dispatch(loadingModal('Validating Credential, Please wait...'))
      return auth_service.validateCredention(data)
      .then(response=>{  
        dispatch(loginSuccess(response.data))
        dispatch(closeModal())
        return response.data;
      })
      .catch(error=>
        {
          if(!axios.isCancel(error)){
              dispatch(errorModal('Invalid Credential'))
              dispatch(loginError(error.message))
          } 
        })
    }
}

export const checkSession: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = () => {
    return async (dispatch:any):Promise<Action> => {
        dispatch(loadingModal('Checking For Previous Session, Please wait...'))
      dispatch(requestLogin('Validating session, Please wait...'))
      return auth_service.checkSessionValidity()
      .then(response=>{
        dispatch(closeModal())
        dispatch(loginSuccess(response.data))  
        return response.data;  

      })
      .catch(error=>
        {
          if(!axios.isCancel(error)){
              dispatch(closeModal())
              dispatch(loginError(error.message))
          } 
        })
    }
}

export const destroySession: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = () => {
  return async (dispatch:any):Promise<Action> => {
    dispatch(requestLogout('Logging out, Please wait...'))
    return auth_service.logoutUser()
    .then(response=>{  
      dispatch(logoutSuccess())  
      return response.data;  
    })
    .catch(error=>
      {
        if(!axios.isCancel(error)){
          dispatch(logoutError(error.message))
        } 
      })
  }
}