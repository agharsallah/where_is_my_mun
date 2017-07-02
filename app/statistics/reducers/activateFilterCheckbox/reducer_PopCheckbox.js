import { POPACTIVATIONCHECKBOX } from "../../actions/index";

export default function(state =false , action) {
  switch (action.type) {
    case POPACTIVATIONCHECKBOX:
      return action.payload;
  }
  return state;
}
