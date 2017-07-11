import { MAPCOLORSTATE } from "../../actions/index";

export default function(state = ["#0096d6","#005288","#BBDEFB"], action) {
  switch (action.type) {
    case MAPCOLORSTATE:
      return action.payload;
  }
  return state;
}
