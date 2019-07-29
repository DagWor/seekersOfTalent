import React, { Fragment, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Login from '../login/login';
// import SignUp from '../register/register';
import RegistrationForm from './../register/registration-form';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../_state_model/application-state';
import AuthState from '../../../_state_model/auth-state';
import { Redirect } from 'react-router';
import { RoleType } from '../../../_enum/role-type';

export default function AuthPage() {

    const authState:AuthState = useSelector( (appStt:ApplicationState)=>appStt.auth)

    useEffect(() => {
        console.log('AUTH STATE ',authState)
    }, [authState])
    return (
        <Fragment>
            {
                console.log('AUTH STATE 2',authState)
            }
            {
                authState.authenticated?
                window.location.replace('/view-profile')
                :
                null
            }
            {
                !authState.authenticated &&
                <Grid container spacing={0} >
                    <Grid style={{marginTop:'10vh'}} item md={5}>
                        <Login/>
                    </Grid>
                    <Grid item md={7} style={{marginTop:'10vh',borderLeftColor:'gray',borderLeftStyle:'solid',borderLeftWidth:'1px'}}>
                        {/* <SignUp/> */}
                        <RegistrationForm/>
                    </Grid>
                </Grid>   
            }
        </Fragment>
        
    )
}
