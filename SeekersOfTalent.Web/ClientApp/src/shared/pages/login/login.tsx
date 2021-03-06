import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { LoginViewModel } from '../../../_view_model/login-view-model';
import { useDispatch } from 'react-redux';
import {validateCredential} from './../../../_setup/actions/auth-actions'
import { RoleType } from '../../../_enum/role-type';
import { Grid,Container, Typography, Button, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius:'2px'
  },
}));

export default function Login() {
  const classes = useStyles();

  const initialState : LoginViewModel={
    email:'',
    password:'',
    role:1 
  }
  const dispatch= useDispatch()
  const [credential, setCredential] = useState(initialState)
  const submitCredRequest =()=>{
    dispatch(validateCredential(credential))
  }

  return (
      <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} style={{flexDirection: "column"}}>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                onChange={(event)=> setCredential({...credential,email:event.target.value})}
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=> setCredential({...credential,password:event.target.value})}
            />
            <Grid item md={12}>
                <RadioGroup
                            aria-label={'Role'}
                            value={credential.role+''}
                            onChange={ (event: any)=>{
                                setCredential({...credential,role:event.target.value})
                            } }
                            row
                            >
                            <FormControlLabel  value={RoleType.EMPLOYEE + ''} control={<Radio color="primary"/>} label={'Employee'} />
                            <FormControlLabel value={RoleType.EMPLOYER +''} control={<Radio color="primary"/>} label={'Employer'} />
                    </RadioGroup>
            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitCredRequest}
            >
                Sign In
            </Button>
            {/* <Grid container>
                <Grid item>
                <Link to="/register">
                    {"Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid> */}
            </form>
        </div>
        </Container>
      </div>
  );
}