import { ActionCreator, Action } from "redux"
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import AccountService from "../services/account.service";
import { UserProfileRequest } from "../../_view_model/user-information";
import {errorModal, loadingModal, successModal} from "./loading-modal-actions";

const account_service  = new AccountService()

export const registerNewUser: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (data:UserProfileRequest) => {
    return async (dispatch:any):Promise<Action> => {
        dispatch(loadingModal('Saving your data,please wait...'))
      return account_service.createNewUser(data)
      .then(response=>{
          dispatch(successModal('Operation completed successfully!'))
          return response.data;  
      })
      .catch(error=>
        {
          if(!axios.isCancel(error)){
              dispatch(errorModal('Failed To Perform The Operation : '+error.message))
              console.log('ERROR ', error)
          } 
        })
    }
  }

