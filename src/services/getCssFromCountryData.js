import countries from "../domain/countries";
import getRelativeColorFromGradient from "./getRelativeColorFromGradient";
import getRelativeGradientFromIncomePercentage from "./getRelativeGradientFromIncomePercentage";
import getIncomeFromIncomePercentage from "./getIncomeFromIncomePercentage";
import getIncomePercentageFromIncome from "./getIncomePercentageFromIncome";
import {lowestAndHighestWorldIncome} from "./../services/lowestAndHighestWorldIncomeAccessor";
import {averageIncomeColor} from "../domain/constants";
import getIncomeWithSharing from "./getIncomeWithSharing";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";

const lowestIncome = lowestAndHighestWorldIncome[0].income;
const highestIncome = lowestAndHighestWorldIncome[1].income;

export const getCssFromCountryData = (defaultCss, sliderValue) => {
    return  countries.reduce((defaultCss, country) => {
        if (country.income) {
            const calculatedIncome = getIncomeWithSharing(country.income, averageWorldIncome, (sliderValue / 100));

            const incomePercentage = getIncomePercentageFromIncome(lowestIncome, highestIncome, calculatedIncome);
            const relativeGradient = getRelativeGradientFromIncomePercentage(incomePercentage);

            const lowGradientStepIncome = getIncomeFromIncomePercentage(lowestIncome, highestIncome, (relativeGradient.percentage.from / 100));
            const highGradientStepIncome = getIncomeFromIncomePercentage(lowestIncome, highestIncome, (relativeGradient.percentage.to / 100));
            const incomePercentageFromGradientScale = getIncomePercentageFromIncome(lowGradientStepIncome, highGradientStepIncome, calculatedIncome);

            const startColor = getRelativeColorFromGradient(relativeGradient.color.from, relativeGradient.color.to, (Math.floor(incomePercentageFromGradientScale) / 100));
            const startColorArray = startColor.split(',');
            const calculatedColor = getRelativeColorFromGradient(startColorArray, averageIncomeColor, (sliderValue / 100));

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