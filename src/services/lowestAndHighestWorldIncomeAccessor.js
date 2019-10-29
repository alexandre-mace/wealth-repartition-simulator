import countries from "../domain/countries";

const lowestAndHighestWorldIncomeAccessor = () =>  {
    let min = countries[0].rnb, max = countries[0].rnb;

    for (let i = 1, len=countries.length; i < len; i++) {
        if (countries[i].rnb) {
            let country = countries[i].rnb;
            console.log(country)
            min = (country < min) ? country : min;
            max = (country > max) ? country : max;
        }
    }

    return [min, max];
}
export const lowestAndHighestWorldIncomeAccessor1 = lowestAndHighestWorldIncomeAccessor();