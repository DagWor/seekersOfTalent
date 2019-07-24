import React from 'react'
import UserCard from './user-card.tsx/user-card';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '../../navbar'

const useStyles = makeStyles({
    container: {
      marginTop: '10%',
      display: 'float'
    },
    textField: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    dense: {
      marginTop: 'auto',
    },
    menu: {
      width: 'auto',
    },
  });

export default function LandingPage(){
    const classes = useStyles();
    return(
        <div>
            <AppBar />
            <div className={classes.container}>
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
                <UserCard />
            </div>
        </div>
    )
}