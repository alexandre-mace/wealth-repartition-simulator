export default function getRgbColorDifference(startColors, endColors, percentage)
{
    let returnedColorRgb = '';
    startColors.forEach((startColor, index) => {
        if (startColor < endColors[index]) {
            returnedColorRgb += (((endColors[index] - startColor) * percentage + startColor) + (index === 2 ? '' : ', '))
        } else {
            returnedColorRgb += ((startColor - (startColor - endColors[index]) * percentage) + (index === 2 ? '' : ', '))
        }
    });

    return returnedColorRgb;
}