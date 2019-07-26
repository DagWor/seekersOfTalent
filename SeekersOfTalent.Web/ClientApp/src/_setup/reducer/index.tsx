import { combineReducers } from 'redux'
import { ApplicationState } from '../../_state_model/application-state';
import {authReducer} from './auth-reducer'

const rootReducer = combineReducers<ApplicationState>({
    auth:authReducer
})

export default rootReducer
