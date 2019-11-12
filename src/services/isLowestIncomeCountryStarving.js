import getNumberByScaledPercentage from "../utils/getNumberByScaledPercentage";
import {averageWorldIncome} from "./averageWorldIncomeAccessor";
import {lowestAndHighestWorldIncome} from "../services/lowestAndHighestWorldIncomeAccessor";
import {starvationLimit} from "../domain/constants";
const lowestIncomeCountry = lowestAndHighestWorldIncome[0];

export default function isLowestIncomeCountryStarving(incomeSharingPercentage) {
    let calculatedIncome = getNumberByScaledPercentage(lowestIncomeCountry.income, averageWorldIncome, (incomeSharingPercentage / 100));

    return calculatedIncome <= starvationLimit;
}
