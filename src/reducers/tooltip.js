import {
    UPDATE_TOOLTIP_VISIBILITY,
    UPDATE_TOOLTIP_CONTENT,
    UPDATE_TOOLTIP_POSITION
} from "../constants/action-types";
import getWordCount from "../utils/getWordCount";

const tooltip = (state = {
    visible: false,
    values: []
}, action) => {
    switch (action.type) {
        case UPDATE_TOOLTIP_VISIBILITY:
            return {
                ...state,
                visible: action.payload
            };
        case UPDATE_TOOLTIP_CONTENT:
            return {
                ...state,
                values: action.payload,
            };
        case UPDATE_TOOLTIP_POSITION:
            return {
                ...state,
                position: {
                    x: action.payload.pageX,
                    y: action.payload.pageY  - (getWordCount(state.values[0]) > 1 ? 85 : 65)
                }
            };
        default:
            return state
    }
};

export default tooltip