import React, {useEffect, useState} from 'react'
import {Typography} from "@material-ui/core";
import WealthRepartitionSlider from "./components/WealthRepartitionSlider";
import SvgMap from "./components/Map";
import {defaultCountryBackgroundColor} from "./domain/constants";
import {getCssFromCountryData} from "./services/getCssFromCountryData";
import {averageWorldRnb} from "./services/averageWorldRnbAccessor";
import Legend from "./components/Legend";

export const App = () => {
    const defaultSliderValue = 0;
    const [mapCss, setMapCss] = useState({});

    useEffect(() => {
        setMapCss(getCssFromCountryData({}, defaultSliderValue));
    }, []);


    const handleSliderChange = (event, value) => {
        setMapCss(getCssFromCountryData(mapCss, value));
    };

    return (
        <>
            <Typography className="text-center mx-auto page-title" variant="h4">World standard of living based on wealth repartition</Typography>
            <Typography variant="h6" className="text-center mx-auto">average world year rnb : {parseInt(averageWorldRnb)} $</Typography>

            <Legend/>
            <SvgMap styles={mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>
            <WealthRepartitionSlider defaultSliderValue={defaultSliderValue} handleSliderChange={handleSliderChange}/>
        </>
    );
}