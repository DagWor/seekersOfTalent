import { combineReducers } from 'redux'
import { ApplicationState } from '../../_state_model/application-state';
import {authReducer} from './auth-reducer'
import {talentsReducer} from './talents-reducer'
import {profileReducer} from './profile-reducer'
import {loadingModalReducer} from "./loading-modal-reducer";

const rootReducer = combineReducers<ApplicationState>({
    auth:authReducer,
    talent:talentsReducer,
    profile:profileReducer,
    stateMachine:loadingModalReducer
})

export default rootReducer
