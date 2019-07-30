import React, {Fragment, useState} from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'
import MoreIcon from '@material-ui/icons/MoreVert';
import { ApplicationState } from '../_state_model/application-state';
import { useSelector, useDispatch } from 'react-redux';
import { RoleType } from '../_enum/role-type';
import { Link } from 'react-router-dom';
import { destroySession } from '../_setup/actions/auth-actions';
import {SearchParamsViewModel} from "../_view_model/search-params";
import {Grid} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import TextField from "@material-ui/core/TextField/TextField";
import {fetchTalentList} from "../_setup/actions/talents-action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
        width:'20%',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
/*      position: 'relative',*/
      /*borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },*/
      marginRight: 0,
      width: '100%'
      /*[theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(15),
        width: '100%',*/
      //},
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const initSearchParams : SearchParamsViewModel = {
    levelOfExpertise: 0,
    typeOfSkill: '',
    studyField: ''
}


export default function NavBar() {
  const classes = useStyles();
  const authState = useSelector( (appState:ApplicationState)=>appState.auth)

  const [searchParams,setSearchParams] = useState(initSearchParams)

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    <MenuItem onClick={handleMenuClose}>
    </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Button fullWidth={true} onClick={()=>dispatch(destroySession())}>Logout</Button>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <a href='/login'>Sign In</a>
        <a href='/login'>Sign Up</a>
      </MenuItem>
    </Menu>
  );

  function handleSkillChange(event : any){
    const temSrchPrms : SearchParamsViewModel= searchParams
    temSrchPrms.typeOfSkill = event.target.value
    updateSync(temSrchPrms as SearchParamsViewModel)
  }
  function handleStudyChange(event : any){
      const temSrchPrms : SearchParamsViewModel= searchParams
      temSrchPrms.studyField = event.target.value
      updateSync(temSrchPrms as SearchParamsViewModel)
  }
  function handleExpertyChange(event : any){
      const temSrchPrms : SearchParamsViewModel= searchParams
      temSrchPrms.levelOfExpertise = event.target.value
      updateSync(temSrchPrms as SearchParamsViewModel)
  }

  async function updateSync(newParams : SearchParamsViewModel){
    await setSearchParams({...newParams})
    dispatch(fetchTalentList(searchParams))
  }

  return (
    <Fragment>
      <AppBar position={'sticky'} color={'default'} >
        <Toolbar>
          <Link to={'/home'}>
            <HomeIcon fontSize={'large'} />
          </Link>
          <Typography className={classes.title} style={{paddingLeft:'5px'}} variant="h5" noWrap>
            Talent fair
          </Typography>
          
          {
            authState.authenticated &&
            authState.session != null &&
            authState.session.role === RoleType.EMPLOYER &&
            <div className={classes.search}>
              <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                          <Select
                              value={searchParams.levelOfExpertise}
                              style={{height:'48px'}}
                              name={'levelOfExpertise'}
                              onChange={handleExpertyChange}

                          >
                              <MenuItem value={0}>All</MenuItem>
                              <MenuItem value={1}>Moderate</MenuItem>
                              <MenuItem value={2}>High</MenuItem>
                              <MenuItem value={3}>Expert</MenuItem>
                          </Select>
                      </FormControl>
                  </Grid>
                <Grid item md={4}>
                    <TextField
                        fullWidth
                        label="Skill"
                        name={'typeOfSkill'}
                        value={searchParams.typeOfSkill}
                        onChange={handleSkillChange}
                    />
                </Grid>
                <Grid item md={4}>
                    <TextField
                        fullWidth
                        label="Field Of Study"
                        name={'studyField'}
                        value={searchParams.studyField}
                        onChange={handleStudyChange}

                    />
                </Grid>
              </Grid>
            </div>
          }
          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          {/* <MenuItem>
            <a style={{color: 'white'}} href='/login'>Sign In</a>
          </MenuItem>
          <MenuItem>
            <a style={{color: 'white'}} href='/register'>Sign Up</a>
          </MenuItem> */}
          {
            authState.authenticated &&
            <IconButton
              edge="end"
              aria-label="Account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          }
            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Fragment>
  );
}
