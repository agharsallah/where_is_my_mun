import { SLIDERVALUE } from "../../actions/index";

export default function(state = {min:50, max:1000}, action) {
  switch (action.type) {
    case SLIDERVALUE:
      return action.payload;
  }
  return state;
}
