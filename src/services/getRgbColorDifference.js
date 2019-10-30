export default function getRgbColorDifference(startColors, endColors, percentage)
{
    let returnedColorRgb = '';
    startColors.forEach((startColor, index) => {
        let startColorToManipulate = parseInt(startColor);
        if (startColorToManipulate < endColors[index]) {
            returnedColorRgb += (((endColors[index] - startColorToManipulate) * percentage + startColorToManipulate) + (index === 2 ? '' : ', '))
        } else {
            returnedColorRgb += ((startColorToManipulate - (startColorToManipulate - endColors[index]) * percentage) + (index === 2 ? '' : ', '))
        }
    });

    return returnedColorRgb;
}