import {UPDATE_TOOLTIP_VISIBILITY} from "../constants/action-types";

export function updateTooltipVisibility(payload) {
    return { type: UPDATE_TOOLTIP_VISIBILITY, payload }
};