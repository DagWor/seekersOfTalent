import React, { useEffect, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import profile from './profile.jpg'
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
import { blue } from '@material-ui/core/colors';
import SkillTable from '../view-profile/skill-table'
import EducationTable from './education-table'
import { useSelector,  useDispatch } from 'react-redux';
import { ApplicationState } from '../../../_state_model/application-state';
import {getUserProfile} from './../../../_setup/actions/profile-actions'
import PortfolieTable from './portfoli-table'
import PortfolioTabs from './tabs';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

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
      <DialogTitle id="simple-dialog-title">Set Backup Account</DialogTitle>
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
  header :{
    width: '100%',
    height: '200px'
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
    marginTop: theme.spacing(2)
  },
  fixedHeight: {
    height: 240,
  },
}));

interface IProps{
  match:any
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
export default function ViewProfile(props : IProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(options[1]);

  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  const dispatch = useDispatch()
  const prfl = useSelector( (appState : ApplicationState)=>appState.profile)
  useEffect(() => {
    dispatch(getUserProfile(props.match.params.employeeId))
   }, [])

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
   <Fragment>

     {
       prfl.loading &&
       <p>Loading talent Information</p>
     }
     {
       !prfl.loading &&
       prfl.error &&
       <p>ERROR : {prfl.message}</p>
     }
     {
       !prfl.loading &&
       !prfl.error &&
       prfl.profile != undefined &&
       <div>
         <div className={classes.header} style={{backgroundImage: `url(${profile})`, backgroundSize: 'cover'}}>
            <Typography component="h1" variant="h2" align="center" style={{paddingTop: '4%'}} color="primary" gutterBottom>
            {prfl.profile.firstName + ' '+prfl.profile.lastName }
            </Typography>
            <Typography variant="body2" align='center' gutterBottom style={{color: 'black'}}>
                {prfl.profile.email}
            </Typography>
            <Typography variant="body2" align='center' gutterBottom style={{color: 'black'}}>
                {prfl.profile.phoneNumber}
            </Typography>

          </div>
         <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <SkillTable skills={prfl.profile.skills}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </div>
      </main>
       </div>
        
      }
   </Fragment>
  );
}