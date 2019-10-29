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
import getPercentageDifferenceBetweenNumbers from "./services/getPercentageDifferenceBetweenNumbers";
import countries from "./domain/countries";
import {Tooltip} from "./components/Tooltip";

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
    const [sliderValue, setSliderValue] = useState(defaultSliderValue);
    const [toolTipDisplayed, setToolTipDisplayed] = useState(false);

    useEffect(() => {
        setMapCss(getCssFromCountryData({}, defaultSliderValue));
    }, []);

    const handleOver = (e) => {
        const country = countries.find(country => country.code === e.target.dataset.id);

        let calculatedIncome = false;
        if (country && country.rnb) {
            calculatedIncome = getPercentageDifferenceBetweenNumbers(Math.floor(parseInt(country.rnb)), Math.floor(parseInt(averageWorldRnb)), (sliderValue / 100))
            setToolTipDisplayed({
                code: e.target.dataset.id,
                relativeElementPosition: e.target.getBoundingClientRect(),
                value: calculatedIncome
            });
        }


    };

    const handleSliderChange = (event, value) => {
        setSliderValue(value);
        setMapCss(getCssFromCountryData(mapCss, value));
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <OnBoarding/>
                {toolTipDisplayed !== false &&
                    <Tooltip toolTipDisplayed={toolTipDisplayed}/>
                }
                <div className={"title-wrapper"}>
                    <Typography color={"primary"} className="mx-auto page-title" variant="h6">Wealth repartition simulator</Typography>
                    <Typography variant="subtitle1" className="mx-auto">average world year income : {parseInt(averageWorldRnb)} $</Typography>
                </div>
                <Legend/>
                <SvgMap handleOver={handleOver} styles={mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>
                <WealthRepartitionSlider defaultSliderValue={defaultSliderValue} handleSliderChange={handleSliderChange}/>
            </ThemeProvider>

        </>

    );
}