import React, {useEffect} from 'react'
import WealthRepartitionSlider from "./components/WealthRepartitionSlider";
import SvgMap from "./components/Map";
import {defaultCountryBackgroundColor} from "./domain/constants";
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
import {connect} from "react-redux";
import {updateWealthSliderValue} from "./actions/updateSliderValues";
import {updateMapCss} from "./actions/updateMapCss";
import {updateTooltipContent} from "./actions/updateTooltipContent";
import {toggleProgressiveColorMode} from "./actions/toggleProgressiveColorMode";
import {updateTooltipPosition} from "./actions/updateTooltipPosition";
import {updateTooltipVisibility} from "./actions/updateTooltipVisibility";

const App = (props) => {
    useEffect(() => {
        props.updateMapCss(0, false);
    }, []);

    const handleMouseEnterCountry = (event) => {
        const country = countries.find(country => country.code === event.target.dataset.id);
        if (country && country.income) {
            const percentageScaledIncome = getNumberByScaledPercentage(country.income, averageWorldIncome, (props.sliderValues.wealth / 100));
            props.updateTooltipVisibility(true);
            props.updateTooltipContent([country.name, percentageScaledIncome]);
            props.updateTooltipPosition(event);
        }
    };

    const handleMouseLeaveCountry = () => {
        props.updateTooltipVisibility(false);
    };

    const handleSliderChange = (event, value) => {
        props.updateWealthSliderValue(value);
        props.updateMapCss(value, props.progressiveColorMode);
    };

    const handleMouseMove = (event) => {
        if (props.tooltip.visible) {
            props.updateTooltipPosition(event)
        }
    };

    const handleColorModeChange = () => {
        props.updateMapCss(props.sliderValues.wealth, !(props.progressiveColorMode));
        props.toggleProgressiveColorMode();
    };

    return (
            <>
                <div className={"d-flex justify-content-between align-items-center align-items-md-start"}>
                    <Typography color={"primary"} className="page-title" variant="h4" >Wealth repartition simulator</Typography>
                    <div className={"d-flex flex-md-column align-items-center align-items-md-end z-index-high"}>
                        <ExtraWealthInfo/>
                        <div className={"mt-md-3 ml-3 ml-md-0"}>
                            <ColorModeSwitcher progressiveColorMode={props.progressiveColorMode} handleColorModeChange={handleColorModeChange}/>
                        </div>
                    </div>
                </div>

                <Legend progressiveColorMode={props.progressiveColorMode} />
                <SvgMap handleMouseMove={handleMouseMove} handleMouseEnterCountry={handleMouseEnterCountry} handleMouseLeaveCountry={handleMouseLeaveCountry} styles={props.mapCss} defaultCountryBackgroundColor={defaultCountryBackgroundColor}/>

                {props.tooltip.visible &&
                    <Tooltip position={props.tooltip.position} values={props.tooltip.values}/>
                }

                <WealthRepartitionSlider defaultSliderValue={props.sliderValues.wealth} handleSliderChange={handleSliderChange}/>

                <SnackMessage open={!isLowestIncomeCountryStarving(props.sliderValues.wealth)} message={lowestAndHighestWorldIncome[0].name + " is no longer considered in a starvation state !"}/>

                <OnBoarding/>
                <PreventMobilePortrait/>
            </>
    );
};

const mapStateToProps = state => ({
    sliderValues: state.sliderValues,
    mapCss: state.mapCss,
    tooltip: state.tooltip,
    progressiveColorMode: state.progressiveColorMode
});

const mapDispatchToProps = dispatch => ({
    updateWealthSliderValue: (value) => dispatch(updateWealthSliderValue(value)),
    updateMapCss: (repartitionPercentage, isProgressiveMode) => dispatch(updateMapCss({ repartitionPercentage: repartitionPercentage, isProgressiveMode: isProgressiveMode })),
    updateTooltipVisibility: (visible) => dispatch(updateTooltipVisibility(visible)),
    updateTooltipContent: (values) => dispatch(updateTooltipContent(values)),
    updateTooltipPosition: (event) => dispatch(updateTooltipPosition(event)),
    toggleProgressiveColorMode: () => dispatch(toggleProgressiveColorMode())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)