import { AREAACTIVATIONCHECKBOX } from "../../actions/index";

export default function(state =false , action) {
  switch (action.type) {
    case AREAACTIVATIONCHECKBOX:
      return action.payload;
  }
  return state;
}
