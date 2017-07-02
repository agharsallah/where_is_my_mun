import { combineReducers } from "redux";
import popFilter from './reducer_popFilter' ;
import irieCheckbox from './reducer_IrieCheckbox' ;
import changeMapColor from './reducer_changeMapColor' ;
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
