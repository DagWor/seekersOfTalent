import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
      textAlign: 'center',
      width: '20%',
    minWidth: 275,
    margin: '2%',
    float: 'left'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UserCard() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {'Dagmawi Worku'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary" gutterBottom>
          {"'Web Developer'"}
        </Typography>
        <hr />
        <Typography className={classes.title} color="textSecondary">
         Company: {'ModernETH'}
        </Typography>
        <Typography variant="body2" component="p">
          {'Java Programmer'}
        </Typography>
        <hr />
        <Typography variant="body2" component="p">
          <p>{'wertyuioplkmnbvcxzasdfghjkl'}</p>
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth={true} color="primary" size="small">View Profile</Button>
      </CardActions>
    </Card>
  );
}
