import {TOGGLE_PROGRESSIVE_COLOR_MODE} from "../constants/action-types";

export function toggleProgressiveColorMode(payload) {
    return { type: TOGGLE_PROGRESSIVE_COLOR_MODE, payload }
};