import React from 'react';
import incomeColorLegends from './../domain/legends/incomeColorLegend'
import {Paper, Typography} from "@material-ui/core";
import {defaultCountryBackgroundColor} from "../domain/constants";

export const Legend = () => {
    return (
        <Paper>
            <div className={"legends"}>
                <Typography variant="caption" display="block" gutterBottom className={'legend-unity'}>
                    dollars $
                </Typography>
                {incomeColorLegends.map((colorLegend, index) => (
                    <div className={"d-flex legend-item-wrapper"} key={index}>
                        <div className={"legendItem"} style={{backgroundColor: colorLegend.color}}></div><span>{colorLegend.income}</span>
                    </div>
                ))}
                <div className={"d-flex legend-item-wrapper"}>
                    <div className={"legendItem"} style={{backgroundColor: defaultCountryBackgroundColor}}></div><span>No data</span>
                </div>
            </div>
        </Paper>
    );
}