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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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

export default function UserCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card} >
      <CardContent>
      <CardMedia
        className={classes.media}
        image={profile}
        title="profile"
      />
      <Typography variant={'h6'}>Dagmawi Werku</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          This is where the section where the bio of this particular talent
          goes so the everyone can get a general idea of the individual.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button color='primary' variant={'outlined'} style={{borderRadius:'2px'}} fullWidth href='/build-profile'>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
