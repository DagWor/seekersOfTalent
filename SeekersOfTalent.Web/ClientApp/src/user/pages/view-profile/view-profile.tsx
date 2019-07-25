import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import profile from './profile.png'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { blue } from '@material-ui/core/colors';
import SkillTable from '../view-profile/skill-table'
import ExperienceTable from '../view-profile/experience-table'

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const options = ['Logout'];


function SimpleDialog(props: SimpleDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  function handleListItemClick(value: string) {
    onClose(value);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {options.map(option => (
          <ListItem button onClick={() => handleListItemClick(option)} key={option}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <Button href='/landing' fullWidth={true}><ListItemText  primary={option} /></Button>
            
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    padding: theme.spacing(2),
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function ViewProfile() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(options[1]);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const classes = useStyles();
  const [opened, setOpened] = React.useState(true);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Seek and You Shall Find
          </Typography>
          <Button
          variant="outlined" 
          style={{background: 'white', color: 'black'}}
          color="inherit" 
          onClick={handleClickOpen}>
            Account Options
          </Button>
          <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Basics */}
            <Grid item xs={12} md={4} lg={3}>
                <img  src={profile} className={fixedHeightPaper}/>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper} style={{textAlign: 'center', backgroundColor: '#9e9e9e', paddingTop: 50}}>
              <Typography variant="h2" gutterBottom style={{color: 'white'}}>
                Dagmawi Worku
              </Typography>
              <Typography variant="body2" gutterBottom style={{color: 'white'}}>
                dagmawiworku@gmail.com - +251947391372
              </Typography>
              <Typography variant="subtitle1" gutterBottom style={{color: 'white'}}>
                Web Developer
              </Typography>
              <Typography variant="subtitle2" gutterBottom style={{color: 'white'}}>
                Addis Ababa, Ethiopia
              </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} style={{textAlign: 'center'}}>
                  <Typography variant='h3'>
                    Skills
                  </Typography>
                  <hr />
                  <SkillTable />
              </Paper>
              <Paper className={classes.paper}>
                  <Typography variant='h3' style={{textAlign: 'center'}}>
                    Bio
                  </Typography>
                  <hr />
                  <p>
                    this is  the bio of the individual in question
                  </p>
              </Paper>
              <Paper className={classes.paper} style={{textAlign: 'center'}}>
                  <Typography variant='h3'>
                    Experience
                  </Typography>
                  <hr />
                  <ExperienceTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
        <div className={classes.appBarSpacer} />
    </div>
  );
}