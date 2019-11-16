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
import './ExtraWealthInfo.css';
import {withWidth} from "@material-ui/core";

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

function ExtraWealthInfo(width) {
    const classes = useStyles();

    const isSmallScreen = ['xs', 'sm'].includes(width.width);
    const buttonProps = {
        size: isSmallScreen ? "small" : "medium"
    };

    return (
        <PopupState variant="popper" popupId="popup-extra-wealth-info">
            {popupState => (
                <div>
                    <Button {...buttonProps} variant="contained" {...bindToggle(popupState)}>
                        EXTRA INFO
                    </Button>
                    <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper className={classes.root} id={"extra-wealth-info"}>
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

export default withWidth()(ExtraWealthInfo);