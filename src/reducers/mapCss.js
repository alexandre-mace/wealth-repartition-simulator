import {UPDATE_MAP_CSS} from "../constants/action-types";
import {getMapCss} from "../services/getMapCss";

const mapCss = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_MAP_CSS:
            return getMapCss(state, action.payload.repartitionPercentage, action.payload.isProgressiveMode);
        default:
            return state
    }
}

export default mapCss