import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserCard from './user-card.tsx/user-card'
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../_state_model/application-state';
import { Link } from 'react-router-dom';
import { fetchTalentList } from '../../../_setup/actions/talents-action';
import { SearchParamsViewModel } from '../../../_view_model/search-params';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function LandingPage() {
  
  const initSearchParams: SearchParamsViewModel ={
    levelOfExpertise: 0,
    typeOfSkill: '',
    studyField: '',
  }
  
  const classes = useStyles()
  const authState = useSelector( (slctr:ApplicationState) => slctr.auth )
  const talent = useSelector( (appTlnt: ApplicationState )=> appTlnt.talent )
  const [searchParams,setSearchParams] = useState(initSearchParams)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('[Effect ] : Loading Talents')
    dispatch(fetchTalentList(searchParams))
  }, [])

  console.log('Authentication State',authState)
  return (
    <div style={{flexGrow: '-moz-initial'}}>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              TalentFair
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Browsing for Talent or Looking for Recruiters on the Market?
            </Typography>
            

            {
              !authState.authenticated &&
              <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={6}>
                  <Link style={{textDecoration:'none'}} to={'/auth'}>
                    <Button fullWidth style={{borderRadius:'2px'}} variant="outlined" color="primary">
                      Join Talent fair
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
            }
            
          </Container>
        </div>
        <br />
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          
          <Grid container spacing={4}>
            {talent.talents.map((tlnt,key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <UserCard talent={tlnt} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <br />
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <Button color='primary'>Contact Us</Button>
        </Typography>
      </footer>
      {/* End footer */}
    </div>
  );
}