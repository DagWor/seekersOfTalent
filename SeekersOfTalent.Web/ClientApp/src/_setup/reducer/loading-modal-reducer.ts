import { Reducer } from 'redux';
import { LoadingModalState } from '../../_state_model/loading-modal-state';
import { LoadingModalActions } from '../actions/actionTypes';
let initialState : LoadingModalState={
    open:false,
    loading:false,
    error:false,
    loadingMessage:undefined,
    errorMessage:undefined,
    successMessage:undefined
}

export const loadingModalReducer: Reducer<LoadingModalState> = (state = initialState,action): LoadingModalState => {
    switch(action.type){
        case LoadingModalActions.LOADING:
          return Object.assign({},state,{loading:true,error:false,open:true,loadingMessage:action.loadingMessage})
        case LoadingModalActions.ERROR:
           return Object.assign({},state,{loading:false,error:true,open: true,errorMessage: action.errorMessage})
        case LoadingModalActions.SUCCESS:
           return Object.assign({},state,{loading:false,error:false,open: true,successMessage : action.successMessage})  
        case LoadingModalActions.CLOSE:
           return Object.assign({},initialState)    
        default:
           return state  
    }
}