import countries from "../domain/countries";
import {getColorFromIncome} from "./getColorFromIncome";
import getPercentageDifferenceBetweenNumbers from "./getPercentageDifferenceBetweenNumbers";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";

export const getCssFromCountryData = (defaultCss, sliderValue) => {
    return  countries.reduce((defaultCss, country) => {
        if (country.income) {
            const calculatedIncome = getPercentageDifferenceBetweenNumbers(Math.floor(country.income), Math.floor(averageWorldIncome), (sliderValue / 100));
            const calculatedColor = getColorFromIncome(calculatedIncome);
            if (calculatedColor) {
                return {
                    ...defaultCss,
                    ["path#" + country.code]: {
                        fill: calculatedColor
                    }
                }
            }
        }

        return defaultCss;
    }, defaultCss);
}