import {LoadingModalActions} from './actionTypes'

export function loading(loadingMessage : string){
    return {type : LoadingModalActions.LOADING,loadingMessage}
}

export function error(errorMessage : string){
    return {type:LoadingModalActions.ERROR,errorMessage}
}

export function success(successMessage: string){
    return {type:LoadingModalActions.SUCCESS,successMessage}
}

export function closeModal(){
    return {type:LoadingModalActions.CLOSE}
}