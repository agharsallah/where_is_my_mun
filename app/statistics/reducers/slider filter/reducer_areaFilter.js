import { AREASLIDERVALUE } from "../../actions/index";

export default function(state = {min:50, max:1000}, action) {
  switch (action.type) {
    case AREASLIDERVALUE:
      return action.payload;
  }
  return state;
}
