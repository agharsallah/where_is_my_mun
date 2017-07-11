import { STATEACTIVATIONCHECKBOX } from "../../actions/index";

export default function(state =false , action) {
  switch (action.type) {
    case STATEACTIVATIONCHECKBOX:
      return action.payload;
  }
  return state;
}
