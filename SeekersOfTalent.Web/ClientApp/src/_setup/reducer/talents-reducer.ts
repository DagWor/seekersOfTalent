import { Reducer } from 'redux'
import { TalentActions } from '../actions/actionTypes'
import { TalentsState } from './../../_state_model/talents-state'

let initialState : TalentsState={
    loading:false,
    error:false,
    message:'',
    talents:[]
}

export const talentsReducer: Reducer<TalentsState> = (state = initialState,action): TalentsState => {
    switch(action.type){
        case TalentActions.TALENT_LIST_LOADING:
          return {...state,...{loading:true,error:false,message:action.message}}
        case TalentActions.TALENT_LIST_ERROR:
           return {...state,...{loading:false,error:true,message: action.message}}
        case TalentActions.TALENT_LIST_SUCCESS:
           return {...state, ...{ loading:false,error:false,talents:action.talents}}  
        default:
           return state  
    }
}