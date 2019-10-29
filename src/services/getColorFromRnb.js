import rnbColorLegends from './../domain/legends/rnbColorLegend'

export const getColorFromRnb = (rnb) => {
    let returnedColor = false;
    for (let i = 0; i < rnbColorLegends.length; i++) {
        if (parseInt(rnb) >= parseInt(rnbColorLegends[i].rnb)) {
            returnedColor = rnbColorLegends[i].color;
            break;
        }
    }
    return returnedColor;
};