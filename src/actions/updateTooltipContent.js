import {UPDATE_TOOLTIP_CONTENT} from "../constants/action-types";

export function updateTooltipContent(payload) {
    return { type: UPDATE_TOOLTIP_CONTENT, payload }
};