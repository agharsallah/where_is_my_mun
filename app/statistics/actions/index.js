import axios from "axios";

export const SLIDERVALUE = "SLIDERVALUE";

export function getPopValue(popValue) {

  return {
    type: SLIDERVALUE,
    payload: popValue
  };
}
