import countries from "../domain/countries";
import {getColorFromRnb} from "./getColorFromRnb";
import getPercentageDifferenceBetweenNumbers from "./getPercentageDifferenceBetweenNumbers";
import {averageWorldRnb} from "./averageWorldRnbAccessor";

export const getCssFromCountryData = (defaultCss, sliderValue) => {
    return  countries.reduce((defaultCss, country) => {
        if (country.rnb) {
            const calculatedRnb = getPercentageDifferenceBetweenNumbers(Math.floor(parseInt(country.rnb)), Math.floor(parseInt(averageWorldRnb)), (sliderValue / 100));
            const calculatedColor = getColorFromRnb(calculatedRnb);
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