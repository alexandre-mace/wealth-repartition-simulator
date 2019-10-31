import getIncomeWithSharing from "./getIncomeWithSharing";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";
import getStepIncomeFromIncome from "./getStepIncomeFromIncome";
import getIncomePercentageFromIncome from "./getIncomePercentageFromIncome";
import getRelativeGradientFromIncomePercentage from "./getRelativeGradientFromIncomePercentage";
import getIncomeFromIncomePercentage from "./getIncomeFromIncomePercentage";
import getRelativeColorFromGradient from "./getRelativeColorFromGradient";
import {lowestAndHighestWorldIncome} from "./lowestAndHighestWorldIncomeAccessor";

const lowestIncome = lowestAndHighestWorldIncome[0].income;
const highestIncome = lowestAndHighestWorldIncome[1].income;

export default function getColorFromIncome(income) {
        const calculatedIncome = getStepIncomeFromIncome(getIncomeWithSharing(income, averageWorldIncome, 0));

        const incomePercentage = getIncomePercentageFromIncome(lowestIncome, highestIncome, calculatedIncome);
        const relativeGradient = getRelativeGradientFromIncomePercentage(incomePercentage);
        const lowGradientStepIncome = getIncomeFromIncomePercentage(lowestIncome, highestIncome, (relativeGradient.percentage.from / 100));

        const highGradientStepIncome = getIncomeFromIncomePercentage(lowestIncome, highestIncome, (relativeGradient.percentage.to / 100));
        const incomePercentageFromGradientScale = getIncomePercentageFromIncome(lowGradientStepIncome, highGradientStepIncome, calculatedIncome);

        const calculatedColor = getRelativeColorFromGradient(relativeGradient.color.from, relativeGradient.color.to, (Math.floor(incomePercentageFromGradientScale) / 100));
        return calculatedColor;
};
