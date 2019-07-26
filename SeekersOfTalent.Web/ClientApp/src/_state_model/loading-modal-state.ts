export interface LoadingModalState{
    open: boolean
    loading : boolean,
    error : boolean,
    loadingMessage : string | undefined,
    errorMessage : string | undefined ,
    successMessage : string | undefined
}