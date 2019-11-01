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
import {ColorModeSwitcher} from "./components/ColorModeSwitcher";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#38d39f'
        }
    },
});
theme = responsiveFontSizes(theme);

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

export const App = () => {
    const defaultSliderValue = 0;
    const [mapCss, setMapCss] = useState({});
    const [sliderValue, setSliderValue] = useState(defaultSliderValue);
    const [toolTipDisplayed, setToolTipDisplayed] = useState(false);
    const [mousePosition, setMousePosition] = useState(false);
    const [progressiveColorMode, setProgressiveColorMode] = React.useState(false);
    const [openSnackMessage, setOpenSnackMessage] = React.useState(false);

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

    const handleOpenSnackMessage = () => {
        setOpenSnackMessage(true);
    };

    const handleCloseSnackMessage = () => {
        setOpenSnackMessage(false);
    };

    const handleSliderChange = (event, value) => {
        let somaliaIncome = countries.find(country => country.code === 'SO').income;
        let calculatedIncome = getIncomeWithSharing(somaliaIncome, averageWorldIncome, (sliderValue / 100));

        if (calculatedIncome > 5000) {
            if (sliderValue < value) {
                handleOpenSnackMessage()
            }
        }
        if (calculatedIncome < 5000) {
            handleCloseSnackMessage();
        }

        setSliderValue(value);
        setMapCss(getCssFromCountryData(mapCss, value, progressiveColorMode));
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

    const handleColorModeChange = () => {
        setProgressiveColorMode(!progressiveColorMode);
        setMapCss(getCssFromCountryData(mapCss, sliderValue, !progressiveColorMode));
    };

    return (
            <ThemeProvider theme={theme}>

                <OnBoarding/>

                <PreventMobilePortrait/>


                <div className={"map-section"} onMouseMove={handleMove}>
                    <div className={"title-wrapper d-flex justify-content-between"}>
                        <Typography color={"primary"} className="page-title" variant="h4" >Wealth repartition simulator</Typography>
                        <SimpleWealthInfo/>
                    </div>

                    <Legend progressiveColorMode={progressiveColorMode} />
                    <SvgMap handleEnter={handleEnter} handleLeave={handleLeave} styles={mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>
                    <Tooltip toolTipDisplayed={toolTipDisplayed} mousePosition={mousePosition}/>

                    <ColorModeSwitcher progressiveColorMode={progressiveColorMode} handleColorModeChange={handleColorModeChange}/>

                    <WealthRepartitionSlider defaultSliderValue={defaultSliderValue} handleSliderChange={handleSliderChange}/>

                    <Snackbar
                        open={openSnackMessage}
                        anchorOrigin={{ vertical: 'bottom',horizontal: 'right' }}
                        autoHideDuration={8000}
                        key={`bottom, right`}
                        onClose={handleCloseSnackMessage}
                        ClickAwayListenerProps={{ mouseEvent: false}}
                        TransitionComponent={TransitionLeft}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Somalia is no longer considered in a starvation state !</span>}
                    />
                </div>
            </ThemeProvider>
    );
}