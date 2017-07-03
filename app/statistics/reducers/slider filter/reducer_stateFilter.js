import { STATESLIDERVALUE } from "../../actions/index";

export default function(state = "All", action) {
  switch (action.type) {
    case STATESLIDERVALUE:
      return action.payload;
  }
  return state;
}
