import React from 'react'
import Grid from '@material-ui/core/Grid'
import Login from '../login/login';
// import SignUp from '../register/register';
import RegistrationForm from '../register/registration-form';

export default function AuthPage() {
    return (
        <Grid container spacing={0} >
            <Grid style={{marginTop:'10vh'}} item md={5}>
                <Login/>
            </Grid>
            <Grid item md={7} style={{marginTop:'10vh',borderLeftColor:'gray',borderLeftStyle:'solid',borderLeftWidth:'1px'}}>
                {/* <SignUp/> */}
                <RegistrationForm/>
            </Grid>
        </Grid>
    )
}
