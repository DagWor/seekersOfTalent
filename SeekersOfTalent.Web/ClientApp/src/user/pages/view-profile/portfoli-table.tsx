import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PortfolioViewModel } from '../../../_view_model/portfolio';

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
  portfolioHistory : PortfolioViewModel
}

export default function PortfolieTable(props:IProps) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Field of study</TableCell>
            <TableCell align="justify">Project name</TableCell>
            <TableCell align="right">Project Description</TableCell>
            <TableCell align="right">Links</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {props.portfolioHistory.projects.map( (proj ,key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {proj.name}
              </TableCell>
              <TableCell align={'justify'}>{proj.description}</TableCell>
              <TableCell align="justify">{proj.links}</TableCell>
            </TableRow>
          ))}
        </TableBody>


      </Table>
    </Paper>
  );
}
