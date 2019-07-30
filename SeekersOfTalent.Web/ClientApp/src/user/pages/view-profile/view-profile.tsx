import React, {Fragment, useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
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
import {blue} from '@material-ui/core/colors';
import SkillTable from '../view-profile/skill-table'
import EducationTable from './education-table'
import ExperienceTable from './education-table'
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../../../_state_model/application-state';
import {getUserProfile} from './../../../_setup/actions/profile-actions'
import PortfolieTable from './portfoli-table'
import {RoleType} from '../../../_enum/role-type';
import RegistrationFormModal from "../../../shared/pages/register/register-form-modal";
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
    flexGrow: 1,
    backgroundColor: 'white'
  },
  header :{
    width: '100%',
    height: '220px'
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
  image: {
    maxWidth: '200px',
    maxHeight: '200px'
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
      color='primary'
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

  const [openForm, setOpenForm] = React.useState(false);

  function handleFormClickOpen() {
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
  }


  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  const dispatch = useDispatch()
  const prfl = useSelector( (appState : ApplicationState)=>appState.profile)
  const authState = useSelector( (appState : ApplicationState)=>appState.auth)

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
           <main className={classes.content}>
               <div className={classes.appBarSpacer}/>
               <Container maxWidth="lg" className={classes.container}>
                   <Grid container spacing={3}>
                       {/* Basics */}
                       <Grid item xs={12} md={4} lg={3}>
                           <img src={profile} className={fixedHeightPaper} alt={'Loading'}/>
                           {
                               authState.session != null &&
                               authState.session.role == RoleType.EMPLOYEE &&
                               <RegistrationFormModal open={openForm} userdata={prfl.profile}
                                                      handleClickOpen={handleFormClickOpen}
                                                      handleClose={handleCloseForm}/>
                           }
                       </Grid>
                       <Grid item xs={12} md={8} lg={9}>
                           <Paper className={fixedHeightPaper}
                                  style={{textAlign: 'center', backgroundColor: '#9e9e9e', paddingTop: 50}}>
                               <Typography variant="h2" gutterBottom style={{color: 'white'}}>
                                   {prfl.profile.firstName + ' ' + prfl.profile.lastName}
                               </Typography>
                           </Paper>
                       </Grid>
                   </Grid>
                   <div>
                       <div className={classes.header}
                            style={{backgroundImage: `url(${profile})`, backgroundSize: 'cover'}}>
                           <Typography component="h1" variant="h2" align="center" style={{paddingTop: '4%'}}
                                       color="primary" gutterBottom>
                               {prfl.profile.firstName + ' ' + prfl.profile.lastName}
                           </Typography>
                           <Typography variant="body2" align='center' gutterBottom style={{color: 'black'}}>
                               {prfl.profile.email}
                           </Typography>
                           <Typography variant="body2" align='center' gutterBottom style={{color: 'black'}}>
                               {prfl.profile.phoneNumber}
                           </Typography>

                       </div>
                       <main className={classes.content}>
                           <div className={classes.appBarSpacer}/>

                           <div className={classes.root} style={{margin: 'none'}}>
                               {/* <AppBar position="static"> */}
                               <Tabs
                                   value={value}
                                   variant='fullWidth'
                                   textColor='primary'
                                   indicatorColor='primary'
                                   onChange={handleChange}
                                   aria-label="simple tabs example"
                               >
                                   <Tab label="Bio" {...a11yProps(0)} />
                                   <Tab label="Skills" {...a11yProps(1)} />
                                   <Tab label="Education" {...a11yProps(2)} />
                                   <Tab label="Profile" {...a11yProps(3)} />
                                   <Tab label="About" {...a11yProps(4)} />
                               </Tabs>
                               {/* </AppBar> */}
                               <TabPanel value={value} index={0}>
                                   <Typography align='center' component='h4' variant='h3'>
                                       Bio
                                   </Typography>
                                   <Typography align='center' variant='subtitle2'>
                                       {prfl.profile.bio}
                                   </Typography>
                               </TabPanel>
                               <TabPanel value={value} index={1}>
                                   <Typography align='center' component='h4' variant='h3'>
                                       Skills
                                   </Typography>
                                   <SkillTable skills={prfl.profile.skills}/>
                               </TabPanel>
                               <TabPanel value={value} index={2}>
                                   <Typography component='h4' align='center' variant='h3'>
                                       Educational background
                                   </Typography>
                                   <EducationTable educationHistory={prfl.profile.educationHistory}/>
                               </TabPanel>
                               <TabPanel value={value} index={3}>
                                   <Typography align='center' component='h4' variant='h3'>
                                       Portfolio
                                   </Typography>
                                   <PortfolieTable portfolioHistory={prfl.profile.portfolio}/>
                               </TabPanel>
                               <TabPanel value={value} index={4}>
                                   <div style={{backgroundImage: `url(${profile})`, backgroundSize: 'cover'}}>
                                       <Typography align='center' component='h4' variant='h3'>
                                           About Me
                                       </Typography>
                                       <Typography align='center' style={{paddingTop: '4%'}}>
                                           <img style={{maxWidth: '300px'}} src={profile}/>
                                       </Typography>
                                       <Typography align='center' style={{paddingTop: '4%'}}>
                                           {prfl.profile.email}
                                       </Typography>
                                       <Typography align='center'>
                                           {prfl.profile.phoneNumber}
                                       </Typography>
                                   </div>
                               </TabPanel>
                           </div>
                       </main>

                   </div>
               </Container>
           </main>
       }
   </Fragment>
  );
}