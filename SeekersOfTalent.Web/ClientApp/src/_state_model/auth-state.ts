import { UserSession } from "../_view_model/session";

export default interface AuthState
{
    authenticated:boolean,
    loading:boolean,
    error:boolean,
    message:string,
    session : UserSession |  null
}