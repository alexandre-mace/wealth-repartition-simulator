import { combineReducers } from 'redux'

import sliderValues from './sliderValues'
import mapCss from './mapCss'
import tooltip from "./tooltip";
import progressiveColorMode from "./progressiveColorMode";

export default combineReducers({
    sliderValues,
    mapCss,
    progressiveColorMode,
    tooltip
})