import countries from "../domain/countries";

const averageWorldIncomeAccessor = () =>  {
    let totalWorldIncome = 0;
    let totalCountry = 0;
    const averageWorldIncome = countries.reduce(function (accumulator, country) {
        if (country.income) {
            totalCountry++;
        }
        return country.income ? accumulator + Math.floor(country.income) : accumulator;
    }, totalWorldIncome);
    return Math.floor(averageWorldIncome / totalCountry);
}
export const averageWorldIncome = averageWorldIncomeAccessor();