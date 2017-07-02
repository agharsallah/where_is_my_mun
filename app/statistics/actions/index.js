import axios from "axios";

export const SLIDERVALUE = "SLIDERVALUE";
export const CHECKEDIRIEBUTTON = "CHECKEDIRIEBUTTON";

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