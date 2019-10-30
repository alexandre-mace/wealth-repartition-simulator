import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {lowestAndHighestWorldIncome} from "./../services/lowestAndHighestWorldIncomeAccessor";
import {averageWorldIncome} from "./../services/averageWorldIncomeAccessor";
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    root: {
        maxWidth: '420px',
        overflowX: 'auto',
        zIndex: 5
    },
    table: {
    },
});

function createData(type: string, name: string, income: number) {
    return { type, name, income };
}

const rows = [
    createData('Average', 'World', averageWorldIncome),
    createData('Lowest', lowestAndHighestWorldIncome[0].name, lowestAndHighestWorldIncome[0].income),
    createData('Highest', lowestAndHighestWorldIncome[1].name, lowestAndHighestWorldIncome[1].income)
];

export default function SimpleWealthInfo() {
    const classes = useStyles();

    return (
        <PopupState variant="popper" popupId="demo-popup-popper">
            {popupState => (
                <div className={"z-index-mid"}>
                    <Button variant="contained" {...bindToggle(popupState)}>
                        EXTRA INFO
                    </Button>
                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper className={classes.root}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Type</TableCell>
                                                <TableCell align={"right"} >Country name</TableCell>
                                                <TableCell align="right">year income per habitant&nbsp;($)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map(row => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.type}
                                                    </TableCell>
                                                    <TableCell align="right">{row.name}</TableCell>
                                                    <TableCell align="right">{row.income}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            )}
        </PopupState>

    );
}