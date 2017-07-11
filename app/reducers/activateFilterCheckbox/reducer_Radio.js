import {RADIOFILTERPICKER } from "../../actions/index";

export default function(state ="pop" , action) {
  switch (action.type) {
    case RADIOFILTERPICKER:
      return action.payload;
  }
  return state;
}
