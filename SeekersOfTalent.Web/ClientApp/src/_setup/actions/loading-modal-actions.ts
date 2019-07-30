import {LoadingModalActions} from './actionTypes'

export function loadingModal(loadingMessage : string){
    return {type : LoadingModalActions.LOADING,loadingMessage}
}

export function errorModal(errorMessage : string){
    return {type:LoadingModalActions.ERROR,errorMessage}
}

export function successModal(successMessage: string){
    return {type:LoadingModalActions.SUCCESS,successMessage}
}

export function closeModal(){
    return {type:LoadingModalActions.CLOSE}
}