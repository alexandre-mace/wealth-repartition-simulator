import steps from './../domain/legends/steps'

export const getColorFromIncome = (income) => {
    let returnedColor = "190,0,0";
    for (let i = 0; i < steps.length; i++) {
        if (income >= steps[i].income) {
            returnedColor = steps[i].color;
            break;
        }
    }
    return returnedColor;
};