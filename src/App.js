import React, {useEffect, useState} from 'react'
import WealthRepartitionSlider from "./components/WealthRepartitionSlider";
import SvgMap from "./components/Map";
import {defaultCountryBackgroundColor} from "./domain/constants";
import {getCssFromCountryData} from "./services/getCssFromCountryData";
import {averageWorldIncome} from "./services/averageWorldIncomeAccessor";
import {Legend} from "./components/Legend";
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {OnBoarding} from "./components/OnBoarding";
import getPercentageDifferenceBetweenNumbers from "./services/getPercentageDifferenceBetweenNumbers";
import countries from "./domain/countries";
import {Tooltip} from "./components/Tooltip";
import {lowestAndHighestWorldIncome} from "./services/lowestAndHighestWorldIncomeAccessor";
import SimpleWealthInfo from "./components/SimpleWealthInfo";

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
    const [mousePosition, setMousePosition] = useState(false);

    useEffect(() => {
        setMapCss(getCssFromCountryData({}, defaultSliderValue));
    }, []);

    const handleEnter = (e) => {
            const country = countries.find(country => country.code === e.target.dataset.id);

            let calculatedIncome = false;
            if (country && country.income) {
                calculatedIncome = getPercentageDifferenceBetweenNumbers(Math.floor(country.income), Math.floor(averageWorldIncome), (sliderValue / 100))
                setToolTipDisplayed({
                    code: e.target.dataset.id,
                    relativeElementPosition: e.target.getBoundingClientRect(),
                    value: calculatedIncome
                });
            }
    };

    const handleLeave = () => {
        setToolTipDisplayed(false);
    };

    const handleSliderChange = (event, value) => {
        setSliderValue(value);
        setMapCss(getCssFromCountryData(mapCss, value));
    };

    const handleMove = (event) => {
        let currentTargetRect = event.currentTarget.getBoundingClientRect();
        const event_offsetX = event.pageX - currentTargetRect.left;
        const event_offsetY = event.pageY - currentTargetRect.top;
        setMousePosition({
            x: event_offsetX,
            y: event_offsetY
        })
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <div onMouseMove={handleMove}>
                    <OnBoarding/>
                    {toolTipDisplayed !== false &&
                    <Tooltip toolTipDisplayed={toolTipDisplayed} mousePosition={mousePosition}/>
                    }
                    <div className={"title-wrapper d-flex justify-content-between"}>
                        <Typography color={"primary"} className="page-title" variant="h5" >Wealth repartition simulator</Typography>
                        {/*<Typography variant="subtitle1" className="mx-auto">Average world year income per habitant : {averageWorldIncome} $</Typography>*/}
                        {/*<Typography variant="subtitle1" className="mx-auto">Lowest year income per habitant : {lowestAndHighestWorldIncome[0].name} {lowestAndHighestWorldIncome[0].income} $</Typography>*/}
                        {/*<Typography variant="subtitle1" className="mx-auto">Highest year income per habitant : {lowestAndHighestWorldIncome[1].name} {lowestAndHighestWorldIncome[1].income} $</Typography>*/}
                        <SimpleWealthInfo/>
                    </div>
                    <Legend/>
                    <SvgMap handleEnter={handleEnter} handleLeave={handleLeave} styles={mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>
                    <WealthRepartitionSlider defaultSliderValue={defaultSliderValue} handleSliderChange={handleSliderChange}/>
                </div>
            </ThemeProvider>

        </>

    );
}