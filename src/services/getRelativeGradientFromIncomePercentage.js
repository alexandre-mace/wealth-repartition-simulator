import gradients from '../domain/legends/gradients';
export default function getRelativeGradientFromIncomePercentage(percentage) {
    let gradient = {};
    for (let i = 1; i < gradients.length; i++) {
        // if you are on the last loop or if your percentage is inferior to the next one
        if ((i === gradients.length) || (percentage <= gradients[i].percentage)) {
            gradient = {
                percentage: {
                    from: gradients[i - 1].percentage,
                    to: gradients[i].percentage
                },
                color: {
                    from: gradients[i - 1].color.split(','),
                    to: gradients[i].color.split(',')
                }
            };
            break;
        }
    }
    return gradient;
}