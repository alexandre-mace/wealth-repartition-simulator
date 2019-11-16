import {UPDATE_WEALTH_SLIDER_VALUE} from "../constants/action-types";

const sliderValues = (state = {
    wealth: 0
}, action) => {
    switch (action.type) {
        case UPDATE_WEALTH_SLIDER_VALUE:
            return {
                ...state,
                wealth: action.payload
            };
        default:
            return state
    }
}

export default sliderValues