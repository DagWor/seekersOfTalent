import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { EducationViewModel } from '../../../_view_model/education';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
  }),
);

function createData(name: string, years: number, jobTitle: string ) {
    return { name, years, jobTitle}
}

const rows = [
  createData('Better Mobile Security', 6, 'Developer'),
  createData('ModernETH', 6, 'Programmer'),
];


interface IProps{
  educationHistory : EducationViewModel[]
}

export default function EducationTable(props:IProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Field of study</TableCell>
            <TableCell align="justify">History</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {props.educationHistory.map( (education ,key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {education.fieldOfStudy}
              </TableCell>
              <TableCell align={'justify'}>{education.description}</TableCell>
              <TableCell align="right">{education.startDate}</TableCell>
              <TableCell align="right">{education.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>


      </Table>
    </Paper>
  );
}
