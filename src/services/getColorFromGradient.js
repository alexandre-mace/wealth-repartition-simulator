import getNumberByScaledPercentage from "../utils/getNumberByScaledPercentage";

export default function getColorFromGradient(startColors, endColors, percentage)
{
    let returnedRgbColor = '';
    startColors.forEach((startColor, index) => {
        returnedRgbColor += (getNumberByScaledPercentage(parseInt(startColor), parseInt(endColors[index]), percentage) + (index === 2 ? '' : ', '));
    });

    return returnedRgbColor;
}