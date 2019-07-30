import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

interface IProps{

}
interface PropsFromState{

}
interface PropsFromDispatch{

}

type AllProps = IProps &
                PropsFromState &
                PropsFromDispatch

interface IState{

}

export default class LoadingPage extends Component<AllProps,IState> {
    
    constructor(props:AllProps) {
        super(props)
    }

    render() {
        return (
        <Grid container style={{width:"100%",backgroundColor:"transparent",boxShadow:"0px",margin:"auto",overflow:"hidden"}} justify="center">
           <Grid item md={12}>
             <LinearProgress  color="primary" /> 
           </Grid>
        </Grid>
        )
    }
}
