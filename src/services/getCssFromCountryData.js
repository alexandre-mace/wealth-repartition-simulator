import countries from "../domain/countries";
import {getColorFromIncome} from "./getColorFromIncome";
import getPercentageDifferenceBetweenNumbers from "./getPercentageDifferenceBetweenNumbers";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";
import getRgbColorDifference from "./getRgbColorDifference";
import getPercentageFromNumberDifference from "./getPercentageFromNumberDifference";

export const getCssFromCountryData = (defaultCss, sliderValue) => {
    return  countries.reduce((defaultCss, country) => {
        if (country.income) {
            const percentage = getPercentageFromNumberDifference(130, 50000, country.income);
            let startColor = false
            if (percentage <= 10) {
                startColor = getRgbColorDifference([255,0,0], [255, 255, 0], (Math.floor(percentage) / 10));
            }
            if (percentage > 10) {
                startColor = getRgbColorDifference([255, 255, 0], [17,79,0], (Math.floor(percentage) / 100));
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