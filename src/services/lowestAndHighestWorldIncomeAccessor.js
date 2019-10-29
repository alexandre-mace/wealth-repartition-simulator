import countries from "../domain/countries";

const lowestAndHighestWorldIncomeAccessor = () =>  {
    let min = countries[0].rnb, max = countries[0].rnb;

    for (let i = 1, len=countries.length; i < len; i++) {
        if (countries[i].rnb) {
            let country = countries[i];
            let countryIncome = parseInt(countries[i].rnb);
            min = (countryIncome < (parseInt(min.rnb) ? parseInt(min.rnb) : 100000 )) ? country : min;
            max = (countryIncome > (parseInt(max.rnb) ? parseInt(max.rnb) : 0)) ? country : max;
        }
    }

    return [min, max];
}
export const lowestAndHighestWorldIncome = lowestAndHighestWorldIncomeAccessor();