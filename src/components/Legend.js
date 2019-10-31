import React from 'react';
import incomeColorLegends from './../domain/legends/incomeColorLegend'
import gradients from './../domain/legends/gradients'
import {Paper, Typography} from "@material-ui/core";
import {defaultCountryBackgroundColor} from "../domain/constants";
import getIncomeFromIncomePercentage from "../services/getIncomeFromIncomePercentage";
import {lowestAndHighestWorldIncome} from "../services/lowestAndHighestWorldIncomeAccessor";

export const Legend = () => {
    const legendGradients = gradients.slice().reverse();
    console.log(legendGradients)
    return (
            <div className={"legends"}>
                <Typography variant="caption" display="block" gutterBottom className={'legend-unity'}>
                    dollars $
                </Typography>
                <div className={"legend-items-wrapper"}>
                    {legendGradients.map((gradient, index) => (
                        <div className={"d-flex gradient-legend-item-wrapper"} key={index}>
                            <>
                                {index + 1 !== legendGradients.length &&
                                <>
                                    <div className={"gradient-legend-item"} style={{ background:  'linear-gradient(' + 'rgb(' + gradient.color + '),rgb(' + legendGradients[index + 1].color + ')'}}></div>
                                    {index + 2 !== legendGradients.length &&
                                    <span>{getIncomeFromIncomePercentage(lowestAndHighestWorldIncome[0].income, lowestAndHighestWorldIncome[1].income, gradient.percentage / 100)}</span>
                                    }
                                    {index + 2 === legendGradients.length &&
                                        <div className={"d-flex flex-column mb-2"}>
                                            <span>{getIncomeFromIncomePercentage(lowestAndHighestWorldIncome[0].income, lowestAndHighestWorldIncome[1].income, gradient.percentage / 100)}</span>
                                            <span className={"down-small d-block"}>{lowestAndHighestWorldIncome[0].income}</span>
                                        </div>
                                    }
                                </>
                                }
                            </>
                        </div>
                    ))}
                </div>
                {/*{incomeColorLegends.map((colorLegend, index) => (*/}
                {/*    <div className={"d-flex legend-item-wrapper"} key={index}>*/}
                {/*        <div className={"legend-item"} style={{backgroundColor: 'rgb(' + colorLegend.color + ')'}}></div><span>{colorLegend.income}</span>*/}
                {/*    </div>*/}
                {/*))}*/}
                <div className={"d-flex legend-item-wrapper"}>
                    <div className={"legend-item"} style={{backgroundColor: defaultCountryBackgroundColor}}></div><span>No data</span>
                </div>
            </div>
    );
}