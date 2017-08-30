import { REGUPDSELECTFFIELD } from "../../actions/index";

export default function(state = "registration", action) {
  switch (action.type) {
    case REGUPDSELECTFFIELD:
      return action.payload;
  }
  return state;
}
