import countries from "../domain/countries";

const lowestAndHighestWorldIncomeAccessor = () =>  {
    let min = countries[0].income, max = countries[0].income;

    for (let i = 1, len=countries.length; i < len; i++) {
        if (countries[i].income) {
            let country = countries[i];
            let countryIncome = countries[i].income;
            min = (countryIncome < (min.income ? min.income : 100000 )) ? country : min;
            max = (countryIncome > (max.income ? max.income : 0)) ? country : max;
        }
    }

    return [min, max];
}
export const lowestAndHighestWorldIncome = lowestAndHighestWorldIncomeAccessor();