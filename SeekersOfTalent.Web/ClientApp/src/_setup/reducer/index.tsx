import { combineReducers } from 'redux'
import { ApplicationState } from '../../_state_model/application-state';
import {authReducer} from './auth-reducer'
import {talentsReducer} from './talents-reducer'
import {profileReducer} from './profile-reducer'

const rootReducer = combineReducers<ApplicationState>({
    auth:authReducer,
    talent:talentsReducer,
    profile:profileReducer
})

export default rootReducer
