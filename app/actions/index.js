import axios from "axios";

export const CHECKEDIRIEBUTTON = "CHECKEDIRIEBUTTON";
export const MAPCOLOR = "MAPCOLOR";
export const MAPCOLORSTATE = "MAPCOLORSTATE";

export const POPACTIVATIONCHECKBOX = "POPACTIVATIONCHECKBOX";
export const STATEACTIVATIONCHECKBOX = "STATEACTIVATIONCHECKBOX";
export const AREAACTIVATIONCHECKBOX = "AREAACTIVATIONCHECKBOX";

export const SLIDERVALUE = "SLIDERVALUE";
export const AREASLIDERVALUE = "AREASLIDERVALUE";
export const STATESLIDERVALUE = "STATESLIDERVALUE";


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
export function getStateColorSets(colorset) {

  return {
    type: MAPCOLORSTATE,
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
/*get Slider Value*/
export function getPopValue(popValue) {

  return {
    type: SLIDERVALUE,
    payload: popValue
  };
}

export function getAreaValue(areaValue) {

  return {
    type: AREASLIDERVALUE,
    payload: areaValue
  };
}
export function getStateValue(stateValue) {

  return {
    type: STATESLIDERVALUE,
    payload: stateValue
  };
}