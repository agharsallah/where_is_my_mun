import { SLIDERVALUE } from "../../actions/index";

export default function(state = {min:10000, max:90000}, action) {
  switch (action.type) {
    case SLIDERVALUE:
      return action.payload;
  }
  return state;
}
