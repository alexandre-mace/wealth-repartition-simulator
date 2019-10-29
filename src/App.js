import React, {useEffect, useState} from 'react'
import WealthRepartitionSlider from "./components/WealthRepartitionSlider";
import SvgMap from "./components/Map";
import {defaultCountryBackgroundColor} from "./domain/constants";
import {getCssFromCountryData} from "./services/getCssFromCountryData";
import {averageWorldRnb} from "./services/averageWorldRnbAccessor";
import {Legend} from "./components/Legend";
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {OnBoarding} from "./components/OnBoarding";

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#009688'
        }
    },
});
theme = responsiveFontSizes(theme);

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
            <ThemeProvider theme={theme}>
                <OnBoarding/>
                <div className={"title-wrapper"}>
                    <Typography color={"primary"} className="mx-auto page-title" variant="h6">Wealth repartition simulator</Typography>
                    <Typography variant="subtitle1" className="mx-auto">average world year income : {parseInt(averageWorldRnb)} $</Typography>
                </div>
                <Legend/>
                <SvgMap styles={mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>
                <WealthRepartitionSlider defaultSliderValue={defaultSliderValue} handleSliderChange={handleSliderChange}/>
            </ThemeProvider>

        </>

    );
}