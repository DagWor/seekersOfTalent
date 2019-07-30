import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal/Modal';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {connect, useDispatch, useSelector} from 'react-redux';
import { Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import {ApplicationState} from "../../_state_model/application-state";
import {closeModal} from "../../_setup/actions/loading-modal-actions";



function LoadingModal () {
    const modalState = useSelector((appState: ApplicationState) => appState.stateMachine)
    const dispatch = useDispatch()
    function handleClose() {
        if (!modalState.loading)
            dispatch(closeModal())
    }
    return (
        <Modal
            open={modalState.open}
            onClose={handleClose}>
            <Paper
                style={{
                    width: '60%',
                    margin: 'auto',
                    marginTop: '10vh',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    padding: '20px'
                }}>
                {
                    !modalState.loading &&
                    modalState.open &&
                    !modalState.error &&
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Typography variant="body1">
                                {modalState.successMessage}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Fab style={{backgroundColor: "green", color: "white"}}>
                                <CheckIcon/>
                            </Fab>
                        </Grid>
                    </Grid>
                }
                {
                    modalState.loading
                    &&
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Typography variant="body1">
                                {modalState.loadingMessage}
                            </Typography>
                        </Grid>
                        <Grid xs={2}>
                            <CircularProgress size={55} color="primary"/>
                        </Grid>
                    </Grid>
                }
                {
                    !modalState.loading &&
                    modalState.open &&
                    modalState.error &&
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Typography variant="body1">
                                {modalState.errorMessage}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Fab color="secondary">
                                <p>Errno</p>
                            </Fab>
                        </Grid>
                    </Grid>
                }
            </Paper>
        </Modal>
    )
}



export default LoadingModal