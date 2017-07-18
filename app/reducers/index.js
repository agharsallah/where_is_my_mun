import { combineReducers } from "redux";
import irieCheckbox from './reducer_IrieCheckbox' ;
import changeMapColor from './mapcolor/reducer_changeMapColor' ;
import changeMapColorState from './mapcolor/reducer_changeMapColorState' ;

import popFilter from './slider filter/reducer_popFilter' ;
import areaFilter from './slider filter/reducer_areaFilter' ;
import stateFilter from './slider filter/reducer_stateFilter' ;


import AreaCheckbox from './activateFilterCheckbox/reducer_AreaCheckbox' ;
import PopCheckbox from './activateFilterCheckbox/reducer_PopCheckbox' ;
import StateCheckbox from './activateFilterCheckbox/reducer_StateCheckbox' ;
import radioFilterPicker from './activateFilterCheckbox/reducer_Radio' ;

import regDate from './DatePicker/reducer_datePicker' ;
import regUpdSelectField from './selectField/reducer_registrationSelectField' ;

const rootReducer = combineReducers({
  irieCheckbox:irieCheckbox,
  changeMapColor,
  changeMapColorState,

  AreaCheckbox,
  PopCheckbox,
  StateCheckbox,
  radioFilterPicker,

  popFilter,
  areaFilter,
  stateFilter,

  regDate,
  regUpdSelectField

});

export default rootReducer;
