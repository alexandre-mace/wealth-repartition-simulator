import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import './WealthRepartitionSlider.css'

const useStyles = makeStyles(theme => ({
    margin: {
        height: theme.spacing(3),
    },
}));

function valuetext(value) {
    return `${value}%`;
}

const marks = [
    {
        value: 0,
        label: '0%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 100,
        label: '100%',
    },
];

export default function WealthRepartitionSlider(props) {
    const classes = useStyles();

    return (
        <div className="container-fluid mt-auto">
            <div className="row">
                <div className="col">
                    <Paper className={'slider-wrapper'}>
                        <div className={classes.root}>
                            <Typography className="text-end" id="discrete-slider-always" gutterBottom>
                                Wealth repartition
                            </Typography>
                            <Slider
                                defaultValue={props.defaultSliderValue}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider-always"
                                step={1}
                                marks={marks}
                                orientation={"horizontal"}
                                min={0}
                                max={100}
                                onChange={props.handleSliderChange}
                                valueLabelDisplay="on"
                            />
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    );
}