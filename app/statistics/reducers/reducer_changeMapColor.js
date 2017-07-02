import { MAPCOLOR } from "../actions/index";

export default function(state = ["#c7e9c0", "#a1d99b", "#74c476","#41ab5d","#238b45", "#00441b"], action) {
  switch (action.type) {
    case MAPCOLOR:
      return action.payload;
  }
  return state;
}
