import { UserProfileResponse } from "../_view_model/user-information";

export interface TalentsState{
    loading:boolean,
    error:boolean,
    message:string,
    talents : UserProfileResponse[]
}