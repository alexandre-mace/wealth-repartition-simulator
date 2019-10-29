import countries from "../domain/countries";

const averageWorldIncomeAccessor = () =>  {
    let totalWorldIncome = 0;
    let totalCountry = 0;
    const averageWorldIncome = countries.reduce(function (accumulateur, country) {
        if (country.income) {
            totalCountry++;
        }
        return country.income ? accumulateur + Math.floor(country.income) : accumulateur;
    }, totalWorldIncome);
    return Math.floor(averageWorldIncome / totalCountry);
}
export const averageWorldIncome = averageWorldIncomeAccessor();