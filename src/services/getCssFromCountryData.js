import countries from "../domain/countries";
import {getColorFromIncome} from "./getColorFromIncome";
import getPercentageDifferenceBetweenNumbers from "./getPercentageDifferenceBetweenNumbers";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";
import getRgbColorDifference from "./getRgbColorDifference";
import getPercentageFromNumberDifference from "./getPercentageFromNumberDifference";

export const getCssFromCountryData = (defaultCss, sliderValue) => {
    return  countries.reduce((defaultCss, country) => {
        if (country.income) {

            const percentage = getPercentageFromNumberDifference(130, 70000, country.income);
            if (country.code === 'FR') {
            }
            const startColor = getRgbColorDifference([190,0,0], [17,79,0], (Math.floor(percentage) / 100));
            if (country.code === 'FR') {
                console.log(startColor)
            }
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