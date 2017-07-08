import { MAPCOLOR } from "../../actions/index";

export default function(state = ["#9ecae1", "#7ab0d3", "#5895c5","#397bb6","#1e60a6", "#084594"], action) {
  switch (action.type) {
    case MAPCOLOR:
      return action.payload;
  }
  return state;
}
