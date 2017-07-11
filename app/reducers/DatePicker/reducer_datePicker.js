import { DATEPICK } from "../../actions/index";

export default function(state = "06-07", action) {
  switch (action.type) {
    case DATEPICK:
      return action.payload;
  }
  return state;
}
