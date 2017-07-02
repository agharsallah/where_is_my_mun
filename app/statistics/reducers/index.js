import { combineReducers } from "redux";
import popFilter from './reducer_popFilter' ;
import irieCheckbox from './reducer_IrieCheckbox' ;

const rootReducer = combineReducers({
  popSlider: popFilter,
  irieCheckbox:irieCheckbox
});

export default rootReducer;
