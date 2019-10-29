import React from 'react';
import rnbColorLegends from './../domain/legends/rnbColorLegend'

export default function Legend() {
    return (
        <div className={"legends"}>
            {rnbColorLegends.map((colorLegend, index) => (
                <div key={index}>
                    <div className={"d-flex"}>
                        <div className={"legendItem"} style={{backgroundColor: colorLegend.color}}></div><span>{colorLegend.rnb}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}