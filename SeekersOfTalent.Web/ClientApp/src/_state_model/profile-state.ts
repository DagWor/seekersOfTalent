import { UserProfileResponse } from "../_view_model/user-information";

export interface ProfileState{
    loading:boolean,
    error:boolean,
    message:string,
    profile : UserProfileResponse | undefined
}