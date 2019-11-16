import React, {useEffect, useState} from 'react'
import WealthRepartitionSlider from "./components/WealthRepartitionSlider";
import SvgMap from "./components/Map";
import {defaultCountryBackgroundColor} from "./domain/constants";
import {getMapCss} from "./services/getMapCss";
import {averageWorldIncome} from "./services/averageWorldIncomeAccessor";
import {Legend} from "./components/Legend";
import Typography from '@material-ui/core/Typography';
import {OnBoarding} from "./components/OnBoarding";
import getNumberByScaledPercentage from "./utils/getNumberByScaledPercentage";
import countries from "./domain/countries";
import {Tooltip} from "./components/Tooltip";
import ExtraWealthInfo from "./components/ExtraWealthInfo";
import {PreventMobilePortrait} from "./components/PreventMobilePortrait";
import {ColorModeSwitcher} from "./components/ColorModeSwitcher";
import {SnackMessage} from "./components/SnackMessage";
import isLowestIncomeCountryStarving from "./services/isLowestIncomeCountryStarving";
import {lowestAndHighestWorldIncome} from "./services/lowestAndHighestWorldIncomeAccessor";
import getWordCount from "./utils/getWordCount";

export const App = () => {
    const defaultSliderValue = 0;
    const [mapCss, setMapCss] = useState({});
    const [sliderValue, setSliderValue] = useState(defaultSliderValue);
    const [targetedCountryInfo, setTargetedCountryInfo] = useState(false);
    const [tooltip, setTooltip] = useState({ visible: false });
    const [progressiveColorMode, setProgressiveColorMode] = React.useState(false);

    useEffect(() => {
        setMapCss(getMapCss({}, defaultSliderValue, false));
    }, []);

    const handleMouseEnterCountry = (event) => {
            const country = countries.find(country => country.code === event.target.dataset.id);
            if (country && country.income) {
                const percentageScaledIncome = getNumberByScaledPercentage(country.income, averageWorldIncome, (sliderValue / 100));
                setTargetedCountryInfo({
                    income: percentageScaledIncome,
                    name: country.name,
                });
                setTooltip({
                    visible: true,
                    values: [country.name, percentageScaledIncome],
                    position: {
                        x: event.pageX,
                        y: event.pageY  - (getWordCount(country.name) > 1 ? 85 : 65)
                    }
                })
            }
    };

    const handleMouseLeaveCountry = () => {
        setTooltip({visible: false});
    };

    const handleSliderChange = (event, value) => {
        setSliderValue(value);
        setMapCss(getMapCss(mapCss, value, progressiveColorMode));
    };

    const handleMouseMove = (event) => {
        if (tooltip.visible) {
            setTooltip({
                ...tooltip,
                position: {
                    x: event.pageX,
                    y: event.pageY  - (getWordCount(targetedCountryInfo.name) > 1 ? 85 : 65)
                }
            })
        }
    };

    const handleColorModeChange = () => {
        setProgressiveColorMode(!progressiveColorMode);
        setMapCss(getMapCss(mapCss, sliderValue, !progressiveColorMode));
    };

    return (
            <>
                <div className={"d-flex justify-content-between align-items-center "}>
                    <Typography color={"primary"} className="page-title" variant="h4" >Wealth repartition simulator</Typography>
                    <div className={"d-flex flex-md-column align-items-center align-items-md-end z-index-high"}>
                        <ExtraWealthInfo/>
                        <div className={"mt-md-3 ml-3 ml-md-0"}>
                            <ColorModeSwitcher progressiveColorMode={progressiveColorMode} handleColorModeChange={handleColorModeChange}/>
                        </div>
                    </div>
                </div>

                <Legend progressiveColorMode={progressiveColorMode} />
                <SvgMap handleMouseMove={handleMouseMove} handleMouseEnterCountry={handleMouseEnterCountry} handleMouseLeaveCountry={handleMouseLeaveCountry} styles={mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>

                {tooltip.visible &&
                    <Tooltip position={tooltip.position} values={tooltip.values}/>
                }

                <WealthRepartitionSlider defaultSliderValue={defaultSliderValue} handleSliderChange={handleSliderChange}/>

                <SnackMessage open={!isLowestIncomeCountryStarving(sliderValue)} message={lowestAndHighestWorldIncome[0].name + " is no longer considered in a starvation state !"}/>

                <OnBoarding/>
                <PreventMobilePortrait/>
            </>
    );
}