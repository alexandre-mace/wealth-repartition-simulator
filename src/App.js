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
import getIncomeWithSharing from "./services/getIncomeWithSharing";
import countries from "./domain/countries";
import {Tooltip} from "./components/Tooltip";
import SimpleWealthInfo from "./components/SimpleWealthInfo";
import {PreventMobilePortrait} from "./components/PreventMobilePortrait";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#38d39f'
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
    const [colorModeSwitcher, setColorModeSwitcher] = React.useState({checkedStep: false});

    useEffect(() => {
        setMapCss(getCssFromCountryData({}, defaultSliderValue, false));
    }, []);

    const handleEnter = (e) => {
            const country = countries.find(country => country.code === e.target.dataset.id);
            let calculatedIncome = false;
            if (country && country.income) {
                calculatedIncome = getIncomeWithSharing(country.income, averageWorldIncome, (sliderValue / 100));
                setToolTipDisplayed({
                    code: e.target.dataset.id,
                    relativeElementPosition: e.target.getBoundingClientRect(),
                    value: calculatedIncome,
                    country: country.name
                });
            }
    };

    const handleLeave = () => {
        setToolTipDisplayed(false);
    };

    const handleSliderChange = (event, value) => {
        setSliderValue(value);
        setMapCss(getCssFromCountryData(mapCss, value, colorModeSwitcher.checkedStep));
    };

    const handleMove = (event) => {
        let currentTargetRect = event.currentTarget.getBoundingClientRect();
        const event_offsetX = event.pageX - currentTargetRect.left;
        const event_offsetY = event.pageY - currentTargetRect.top;
        setMousePosition({
            x: event_offsetX,
            y: event_offsetY
        })
    };

    const handleColorModeChange = name => event => {
        setColorModeSwitcher({ ...colorModeSwitcher, [name]: event.target.checked });
        setMapCss(getCssFromCountryData(mapCss, sliderValue, colorModeSwitcher.checkedStep));
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <OnBoarding/>

                <PreventMobilePortrait/>

                <div className={"map-section"} onMouseMove={handleMove}>
                    <div className={"title-wrapper d-flex justify-content-between"}>
                        <Typography color={"primary"} className="page-title" variant="h4" >Wealth repartition simulator</Typography>
                        <SimpleWealthInfo/>
                    </div>

                    <Legend colorModeSwitcher={colorModeSwitcher} />
                    <SvgMap handleEnter={handleEnter} handleLeave={handleLeave} styles={mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>
                    <Tooltip toolTipDisplayed={toolTipDisplayed} mousePosition={mousePosition}/>

                    <ColorModeSwitcher colorModeSwitcher={colorModeSwitcher} handleColorModeChange={handleColorModeChange}/>

                    <WealthRepartitionSlider defaultSliderValue={defaultSliderValue} handleSliderChange={handleSliderChange}/>
                </div>
            </ThemeProvider>

        </>

    );
}