import { ActionCreator, Action } from "redux"
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import AccountService from "../services/account.service";
import { UserProfileRequest } from "../../_view_model/user-information";

const account_service  = new AccountService()

export const registerNewUser: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (data:UserProfileRequest) => {
    return async (dispatch:any):Promise<Action> => {
      return account_service.createNewUser(data)
      
      .then(response=>{  
          return response.data;  
      })
      .catch(error=>
        {
          if(!axios.isCancel(error)){
              console.log('ERROR ', error)
          } 
        })
    }
  }

