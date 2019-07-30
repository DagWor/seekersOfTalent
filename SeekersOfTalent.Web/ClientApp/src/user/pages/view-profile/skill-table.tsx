import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { SkillViewModel } from '../../../_view_model/skill';

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

function createData(name: string, years: number, skillRate: number ) {
    return { name, years, skillRate}
}

const rows = [
  createData('Java Programming', 6, 7),
  createData('Javascript', 6, 8),
];
interface IProps{
  skills : SkillViewModel[]
}

export default function SkillTable(props:IProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Skill Type</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Level of experty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.skills.map( (skill,key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {skill.name}
              </TableCell>
              <TableCell align="right">{skill.description}</TableCell>
              <TableCell align="right">{skill.levelOfExpertise.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}