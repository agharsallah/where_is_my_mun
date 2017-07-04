import { CHECKEDIRIEBUTTON } from "../actions/index";

export default function(state =false , action) {
  switch (action.type) {
    case CHECKEDIRIEBUTTON:
      return action.payload;
  }
  return state;
}
