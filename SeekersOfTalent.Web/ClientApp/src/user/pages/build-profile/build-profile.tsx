import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '../../../shared/navbar'
import DOB from './birth-select'
import SkillAdd from './skill-add'
import EducationAdd from './education-add'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function BuildProfile() {
  const classes = useStyles();

  return (
      <div>
        <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper} style={{flexDirection: "column"}}>
            <Typography component="h1" variant="h5">
            Building Your Profile
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="standard-textarea"
                    label="Bio"
                    placeholder="Bio"
                    multiline
                    variant='outlined'
                />
                </Grid>
                <Grid item xs={12}>
                    <DOB />
                </Grid>
                <Grid item xs={12}>
                    <SkillAdd />
                </Grid>
                <Grid item xs={12}>
                    <EducationAdd />
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Finish
            </Button>
            </form>
        </div>
        </Container>
    </div>
  );
}