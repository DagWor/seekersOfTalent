import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import profile from './profile.png'
import Button from '@material-ui/core/Button'
import { ApplicationState } from '../../../../_state_model/application-state';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserProfileResponse } from '../../../../_view_model/user-information';
import { documentUrl } from '../../../../_setup/services/document.url';


interface IProps{
  talent : UserProfileResponse  
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      width:'100%',
      height: '250px',
      //paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);





export default function UserCard(props: IProps) {
  const classes = useStyles();
  const authState = useSelector( (appState:ApplicationState)=>appState.auth )
  return (
    <Card className={classes.card} >
      <CardContent>
      <CardMedia
        className={classes.media}
        // image={profile}
        //image={`${documentUrl}${props.talent.profilePicture.id}`}
        title="profile"
      />
      <Typography variant={'h6'}>{props.talent.firstName+' '+props.talent.lastName}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
           {props.talent.bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          !authState.authenticated &&
          <Link style={{width:'100%',textDecoration:'none'}} to={'/auth'}>
            <Button color='primary' variant={'outlined'} style={{borderRadius:'2px'}} fullWidth href='/build-profile'>
                View
            </Button>
          </Link>
        }
        {
          authState.authenticated &&
          <Link style={{width:'100%',textDecoration:'none'}} to={`/view-profile/${props.talent.id}`}>
            <Button color='primary' variant={'outlined'} style={{borderRadius:'2px'}} fullWidth href='/build-profile'>
              View
            </Button>
          </Link>
        }
      </CardActions>
    </Card>
  );
}
