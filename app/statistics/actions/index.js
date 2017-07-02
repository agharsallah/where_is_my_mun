import axios from "axios";

export const SLIDERVALUE = "SLIDERVALUE";
export const CHECKEDIRIEBUTTON = "CHECKEDIRIEBUTTON";
export const MAPCOLOR = "MAPCOLOR";

export const POPACTIVATIONCHECKBOX = "POPACTIVATIONCHECKBOX";
export const STATEACTIVATIONCHECKBOX = "STATEACTIVATIONCHECKBOX";
export const AREAACTIVATIONCHECKBOX = "AREAACTIVATIONCHECKBOX";

export function getPopValue(popValue) {

  return {
    type: SLIDERVALUE,
    payload: popValue
  };
}

export function getIrieButton(checkIrieButton) {

  return {
    type: CHECKEDIRIEBUTTON,
    payload: checkIrieButton
  };
}

export function getColorSets(colorset) {

  return {
    type: MAPCOLOR,
    payload: colorset
  };
}

/*Choose which filter to activate*/
export function getPopPickFilter(popCheckbox) {

  return {
    type: POPACTIVATIONCHECKBOX,
    payload: popCheckbox
  };
}

export function getStatePickFilter(stateCheckbox) {

  return {
    type: STATEACTIVATIONCHECKBOX,
    payload: stateCheckbox
  };
}

export function getAreaPickFilter(AreaCheckbox) {

  return {
    type: AREAACTIVATIONCHECKBOX,
    payload: AreaCheckbox
  };
}