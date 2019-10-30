import incomeColorLegends from './../domain/legends/incomeColorLegend'

export const getColorFromIncome = (income) => {
    let returnedColor = "190,0,0";
    for (let i = 0; i < incomeColorLegends.length; i++) {
        if (income >= incomeColorLegends[i].income) {
            returnedColor = incomeColorLegends[i].color;
            break;
        }
    }
    return returnedColor;
};