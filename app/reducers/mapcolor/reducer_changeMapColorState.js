import { MAPCOLORSTATE } from "../../actions/index";

export default function(state = ["#ce93d8","#ff8f6c","#8bc34a"], action) {
  switch (action.type) {
    case MAPCOLORSTATE:
      return action.payload;
  }
  return state;
}
