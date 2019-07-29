import { ActionCreator, Action } from "redux"
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import AccountService from "../services/account.service";
import { ProfileActions } from "./actionTypes";
import { UserProfileResponse } from "../../_view_model/user-information";

const account_service  = new AccountService()

function requestTalentList(message:string){
    return {type:ProfileActions.PROFILE_LIST_LOADING,message}
  }
  function tlntLstReqSuccess(profile:UserProfileResponse){
    return {type:ProfileActions.PROFILE_LIST_SUCCESS,profile}
  }
  function tlntLstReqError(message:string){
    return {type:ProfileActions.PROFILE_LIST_ERROR,message}
  }


  export const getUserProfile: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (id:string) => {
    return async (dispatch:any):Promise<Action> => {
      console.log('[Action ] fetching talents')
      dispatch(requestTalentList('fetching talents, Please wait...'))
      return account_service.getUserProfile(id)
      .then(response=>{  
        console.log('TALENTS LIST : ',response)
        dispatch(tlntLstReqSuccess(response.data))  
        return response.data;  
      })
      .catch(error=>
        {
          if(!axios.isCancel(error)){
            console.log('[Action ] fetching talents error ')
            dispatch(tlntLstReqError(error.message))
          } 
        })
    }
}
