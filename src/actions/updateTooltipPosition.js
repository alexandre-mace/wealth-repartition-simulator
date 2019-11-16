import {UPDATE_TOOLTIP_POSITION} from "../constants/action-types";

export function updateTooltipPosition(payload) {
    return { type: UPDATE_TOOLTIP_POSITION, payload }
};