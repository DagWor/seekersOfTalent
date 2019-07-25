import React from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export default function DOB() {
  const classes = useStyles();
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMonth(event.target.value as string);
    setYear(event.target.value as string);
  };
  
  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-input">Date</InputLabel>
        <BootstrapInput id="age-customized-input" />
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-select">Month</InputLabel>
        <Select
          value={month}
          onChange={handleChange}
          input={<BootstrapInput name="month" id="age-customized-select" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="age-customized-native-simple" placeholder='Year'>Year</InputLabel>
        <NativeSelect
          value={year}
          onChange={handleChange}
          input={<BootstrapInput name="Year" id="age-customized-native-simple" />}
        >
          <option value="" />
          <option value={10}>1990-2000</option>
          <option value={20}>2000-2010</option>
          <option value={30}>2010-2020</option>
        </NativeSelect>
      </FormControl>
    </form>
  );
}
