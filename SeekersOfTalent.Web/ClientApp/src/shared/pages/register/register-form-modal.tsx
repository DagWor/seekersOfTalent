import React  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import RegistrationForm from './registration-form'
import { UserProfileResponse } from '../../../_view_model/user-information';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Grid from "@material-ui/core/Grid/Grid";


interface IProps{
    handleClickOpen : ()=>void
    handleClose :() => void
    open :boolean
    userdata : UserProfileResponse
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function RegistrationFormModal(props:IProps) {
    const classes = useStyles();
    return (
        <div>
            <Grid container justify={'center'}>
                <Grid item xs={10} md={5} lg={2}>
                    <Button variant="outlined" color="primary" fullWidth onClick={props.handleClickOpen}>
                        Edit Profile
                    </Button>
                </Grid>
            </Grid>
            <Dialog fullScreen open={props.open} onClose={props.handleClose} TransitionComponent={Transition}>
                <AppBar color={'default'} className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit Your Profile
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <RegistrationForm editData ={props.userdata}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default RegistrationFormModal;
