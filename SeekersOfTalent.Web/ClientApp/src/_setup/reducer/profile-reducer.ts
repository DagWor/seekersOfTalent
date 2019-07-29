import { Reducer } from 'redux'
import { ProfileActions } from '../actions/actionTypes'
import { ProfileState } from '../../_state_model/profile-state';

let initialState : ProfileState={
    loading:false,
    error:false,
    message:'',
    profile:undefined
}

export const profileReducer: Reducer<ProfileState> = (state = initialState,action): ProfileState => {
    switch(action.type){
        case ProfileActions.PROFILE_LIST_LOADING:
          return {...state,...{loading:true,error:false,message:action.message}}
        case ProfileActions.PROFILE_LIST_ERROR:
           return {...state,...{loading:false,error:true,message: action.message}}
        case ProfileActions.PROFILE_LIST_SUCCESS:
           return {...state, ...{ loading:false,error:false,profile:action.profile}}  
        default:
           return state  
    }
}