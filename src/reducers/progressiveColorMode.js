import {TOGGLE_PROGRESSIVE_COLOR_MODE} from "../constants/action-types";

const progressiveColorMode = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_PROGRESSIVE_COLOR_MODE:
            return !state
        default:
            return state
    }
}

export default progressiveColorMode