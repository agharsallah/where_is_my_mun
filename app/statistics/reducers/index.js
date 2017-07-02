import { combineReducers } from "redux";
import popFilter from './reducer_popFilter' ;
import irieCheckbox from './reducer_IrieCheckbox' ;
import changeMapColor from './reducer_changeMapColor' ;

const rootReducer = combineReducers({
  popSlider: popFilter,
  irieCheckbox:irieCheckbox,
  mapColor:changeMapColor
});

export default rootReducer;
