import { MAPCOLORSTATE } from "../../actions/index";

export default function(state = ["#9ecae1", "#639eca", "#3072b1", "#084594"], action) {
  switch (action.type) {
    case MAPCOLORSTATE:
      return action.payload;
  }
  return state;
}
