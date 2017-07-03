import { POPACTIVATIONCHECKBOX } from "../../actions/index";

export default function(state =true , action) {
  switch (action.type) {
    case POPACTIVATIONCHECKBOX:
      return action.payload;
  }
  return state;
}
