import countries from "../domain/countries";
import {getColorFromIncome} from "./getColorFromIncome";
import getPercentageDifferenceBetweenNumbers from "./getPercentageDifferenceBetweenNumbers";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";
import getRgbColorDifference from "./getRgbColorDifference";

export const getCssFromCountryData = (defaultCss, sliderValue) => {
    return  countries.reduce((defaultCss, country) => {
        if (country.income) {
            const startColor = getColorFromIncome(country.income);
            const startColorArray = startColor.split(',');
            const calculatedColor = getRgbColorDifference(startColorArray, [154,254,1], (sliderValue / 100));
            // const calculatedIncome = getPercentageDifferenceBetweenNumbers(Math.floor(country.income), Math.floor(averageWorldIncome), (sliderValue / 100));
            if (calculatedColor) {
                return {
                    ...defaultCss,
                    ["path#" + country.code]: {
                        fill: 'rgb(' + calculatedColor + ')'
                    }
                }
            }
        }

        return defaultCss;
    }, defaultCss);
}