import { ActionCreator, Action } from "redux"
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import TalentService from './../services/talent.servicee'
import { LoginViewModel } from "../../_view_model/login-view-model";
import {  TalentActions } from "./actionTypes";
import { UserSession } from "../../_view_model/session";
import { SearchParamsViewModel } from "../../_view_model/search-params";


const talent_service  = new TalentService()

function requestTalentList(message:string){
  return {type:TalentActions.TALENT_LIST_LOADING,message}
}
function tlntLstReqSuccess(talents:UserSession){
  return {type:TalentActions.TALENT_LIST_SUCCESS,talents}
}
function tlntLstReqError(message:string){
  return {type:TalentActions.TALENT_LIST_ERROR,message}
}




export const fetchTalentList: ActionCreator<ThunkAction<Promise<Action>, any, void, any>> = (data:SearchParamsViewModel) => {
    return async (dispatch:any):Promise<Action> => {
      console.log('[Action ] fetching talents')
      console.log('[Search Params ]',data)
      dispatch(requestTalentList('fetching talents, Please wait...'))
      return talent_service.fetchTalentList(data)
      .then(response=>{  
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
