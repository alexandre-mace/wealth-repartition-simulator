import {UPDATE_WEALTH_SLIDER_VALUE} from "../constants/action-types";

export function updateWealthSliderValue(payload) {
    return { type: UPDATE_WEALTH_SLIDER_VALUE, payload }
};