import React, { Fragment, useEffect } from 'react'
import NavBar from '../../shared/navbar';
import AppRouter from '../configs/app-router';
import { checkSession } from '../../_setup/actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../_state_model/application-state';

export default function AppLayout() {
    
    const appState = useSelector((state:ApplicationState)=>state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkSession())
    }, [])
    
    return (
        <Fragment>
            <NavBar/>
            {
                appState.loading &&
                <p>Loading ... </p>
            }
            {
                !appState.loading &&
                <AppRouter/>
            }
        </Fragment>
    )
}
