import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '80vw',
        paddingLeft: 'calc(10vw - 1.5rem)'
    },
    margin: {
        height: theme.spacing(3),
    },
}));

function valuetext(value) {
    return `${value}°C`;
}

const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 50,
        label: '50°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];

export default function TemperatureSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography className="text-end" id="discrete-slider-always" gutterBottom>
                Temperature
            </Typography>
            <Slider
                defaultValue={props.sliderValue}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                classes={classes.root}
                min={0}
                max={100}
                onChange={props.handleSliderChange}
                valueLabelDisplay="on"
            />
        </div>
    );
}