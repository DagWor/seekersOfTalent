import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card} >
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            D
          </Avatar>
        }
        action={
          <IconButton aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Dagmawi  Worku"
        subheader="Web Developer"
      />
      <CardMedia
        className={classes.media}
        image={profile}
        title="profile"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This is where the section where the bio of this particular talent
          goes so the everyone can get a general idea of the individual.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button color='primary' href='/build-profile'>
          View
        </Button>
        <IconButton color='primary' aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
        color='primary'
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Cumque soluta culpa quod cupiditate aspernatur corporis, 
          </Typography>
          <Typography paragraph>
          quas quos sit aliquam doloremque delectus possimus laborum
             dignissimos saepe quasi blanditiis magnam, placeat praesentium.
          </Typography>
          <Typography paragraph>
            quas quos sit aliquam doloremque delectus possimus laborum
             dignissimos saepe quasi blanditiis magnam, placeat praesentium.
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
