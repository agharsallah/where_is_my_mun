import axios from "axios";

export const SLIDERVALUE = "SLIDERVALUE";
export const CHECKEDIRIEBUTTON = "CHECKEDIRIEBUTTON";
export const MAPCOLOR = "MAPCOLOR";

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