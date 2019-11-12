import countries from "../domain/countries";
import getNumberByScaledPercentage from "../utils/getNumberByScaledPercentage";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";
import getFloorStepIncome from "./getFloorStepIncome";
import getColorFromIncome from "./getColorFromIncome";

export const getMapCss = (defaultCss, sliderValue, progressiveMode) => {
    return countries.reduce((defaultCss, country) => {
        if (country.income) {

            let calculatedIncome = getNumberByScaledPercentage(country.income, averageWorldIncome, (sliderValue / 100));
            if (!progressiveMode) {
                calculatedIncome = getFloorStepIncome(calculatedIncome);
            }

            const calculatedColor = getColorFromIncome(calculatedIncome);

            return {
                ...defaultCss,
                ["path#" + country.code]: {
                    fill: 'rgb(' + calculatedColor + ')'
                }
            }
        }

        return defaultCss;
    }, defaultCss);
}