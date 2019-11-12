import getScaledPercentageByNumber from "../utils/getScaledPercentageByNumber";
import getGradientFromIncomePercentage from "./getGradientFromIncomePercentage";
import getColorFromGradient from "./getColorFromGradient";
import {lowestAndHighestWorldIncome} from "./lowestAndHighestWorldIncomeAccessor";
import getNumberByScaledPercentage from "../utils/getNumberByScaledPercentage";

const lowestIncome = lowestAndHighestWorldIncome[0].income;
const highestIncome = lowestAndHighestWorldIncome[1].income;

export default function getColorFromIncome(income) {
        const incomePercentage = getScaledPercentageByNumber(lowestIncome, highestIncome, income);

        const gradient = getGradientFromIncomePercentage(incomePercentage);

        const lowGradientStepIncome = getNumberByScaledPercentage(lowestIncome, highestIncome, (gradient.percentage.from / 100));
        const highGradientStepIncome = getNumberByScaledPercentage(lowestIncome, highestIncome, (gradient.percentage.to / 100));

        const incomePercentageFromGradientScale = getScaledPercentageByNumber(lowGradientStepIncome, highGradientStepIncome, income);

        return getColorFromGradient(gradient.color.from, gradient.color.to, (Math.floor(incomePercentageFromGradientScale) / 100));
};
