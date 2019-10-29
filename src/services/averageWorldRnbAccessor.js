import countries from "../domain/countries";

const averageWorldRnbAccessor = () =>  {
    let totalWorldRnb = 0;
    let totalCountry = 0;
    const averageWorldRnb = countries.reduce(function (accumulateur, country) {
        if (country.rnb) {
            totalCountry++;
        }
        return country.rnb ? accumulateur + Math.floor(parseInt(country.rnb)) : accumulateur;
    }, totalWorldRnb);
    return averageWorldRnb / totalCountry;
}
export const averageWorldRnb = averageWorldRnbAccessor();