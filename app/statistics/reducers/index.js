import { combineReducers } from "redux";
import popFilter from './reducer_popFilter' ;
const rootReducer = combineReducers({
  popSlider: popFilter
});

export default rootReducer;
