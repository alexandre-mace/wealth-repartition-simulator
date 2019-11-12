import steps from './../domain/legends/steps'

export default function getFloorStepIncome(income) {
    let floorStepIncome = false;

    for (let i = 0; i < steps.length; i++) {
        if (income >= steps[i].income) {
            floorStepIncome = steps[i].income;
            break;
        }
    }
    return floorStepIncome;
}