import countries from "../domain/countries";
import {getColorFromIncome} from "./getColorFromIncome";
import getPercentageDifferenceBetweenNumbers from "./getPercentageDifferenceBetweenNumbers";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";
import getRgbColorDifference from "./getRgbColorDifference";
import getPercentageFromNumberDifference from "./getPercentageFromNumberDifference";
import getNumberFromPercentageDiffenrece from "./getNumberFromPercentageDiffenrece";

export const getCssFromCountryData = (defaultCss, sliderValue) => {
    return  countries.reduce((defaultCss, country) => {
        if (country.income) {
            const percentage = getPercentageFromNumberDifference(130, 116430, country.income);
            let startColor = false;
                if (percentage <= 2) {
                    let stepNumber = getNumberFromPercentageDiffenrece(130, 116430, (2 / 100));
                    let stepPercentage = getPercentageFromNumberDifference(130, stepNumber, country.income);
                    startColor = getRgbColorDifference([255,0,0], [255, 165, 0], (Math.floor(stepPercentage) / 100));
            }
            if (percentage > 2 && percentage <=7) {
                let lowStepNumber = getNumberFromPercentageDiffenrece(130, 116430, (2 / 100));
                let highStepNumber = getNumberFromPercentageDiffenrece(130, 116430, (7 / 100));
                let stepPercentage = getPercentageFromNumberDifference(lowStepNumber, highStepNumber, country.income);
                startColor = getRgbColorDifference([255,165,0], [255, 255, 0], (Math.floor(stepPercentage) / 100));
            }
            if (percentage > 7 && percentage <= 30) {
                let lowStepNumber = getNumberFromPercentageDiffenrece(130, 116430, (7 / 100));
                let highStepNumber = getNumberFromPercentageDiffenrece(130, 116430, (30 / 100));
                let stepPercentage = getPercentageFromNumberDifference(lowStepNumber, highStepNumber, country.income);
                startColor = getRgbColorDifference([255,255,0], [159, 255, 128], (Math.floor(stepPercentage) / 100));
            }
            if (percentage > 30 && percentage <= 50) {
                let lowStepNumber = getNumberFromPercentageDiffenrece(130, 116430, (30 / 100));
                let highStepNumber = getNumberFromPercentageDiffenrece(130, 116430, (50 / 100));
                let stepPercentage = getPercentageFromNumberDifference(lowStepNumber, highStepNumber, country.income);
                startColor = getRgbColorDifference([159, 255, 128], [51, 204, 0], (Math.floor(stepPercentage) / 100));
            }
            if (percentage > 50) {
                let lowStepNumber = getNumberFromPercentageDiffenrece(130, 116430, (50 / 100));
                let highStepNumber = 116430;
                let stepPercentage = getPercentageFromNumberDifference(lowStepNumber, highStepNumber, country.income);
                startColor = getRgbColorDifference([51, 204, 0], [17,77,0], (Math.floor(stepPercentage) / 100));
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