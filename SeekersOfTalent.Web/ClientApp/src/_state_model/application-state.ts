import AuthState from './auth-state'
import { TalentsState } from './talents-state'
import { ProfileState } from './profile-state'
import {LoadingModalState} from "./loading-modal-state";


export interface ApplicationState{
    auth : AuthState
    talent : TalentsState
    profile : ProfileState
    stateMachine :LoadingModalState
}