import { combineReducers } from "redux";
import irieCheckbox from './reducer_IrieCheckbox' ;
import changeMapColor from './reducer_changeMapColor' ;

import popFilter from './slider filter/reducer_popFilter' ;
import areaFilter from './slider filter/reducer_areaFilter' ;
import stateFilter from './slider filter/reducer_stateFilter' ;


import AreaCheckbox from './activateFilterCheckbox/reducer_AreaCheckbox' ;
import PopCheckbox from './activateFilterCheckbox/reducer_PopCheckbox' ;
import StateCheckbox from './activateFilterCheckbox/reducer_StateCheckbox' ;

const rootReducer = combineReducers({
  popSlider: popFilter,
  irieCheckbox:irieCheckbox,
  mapColor:changeMapColor,
  AreaCheckbox,
  PopCheckbox,
  StateCheckbox
});

export default rootReducer;
