import React from 'react';
import rnbColorLegends from './../domain/legends/rnbColorLegend'
import {Paper, Typography} from "@material-ui/core";

export const Legend = () => {
    return (
        <Paper>
            <div className={"legends"}>
                <Typography variant="caption" display="block" gutterBottom>
                    dollars $
                </Typography>
                {rnbColorLegends.map((colorLegend, index) => (
                    <div key={index}>
                        <div className={"d-flex"}>
                            <div className={"legendItem"} style={{backgroundColor: colorLegend.color}}></div><span>{colorLegend.rnb}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Paper>
    );
}