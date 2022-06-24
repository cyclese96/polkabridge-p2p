import { LOAD_USER } from "../actions/types";

const initalState = {
  jwtToken: null,
  account: null,
  id: null,
};

export default function (state = initalState, action) {
  // todo design and write action types and state updates
  switch (action.type) {
    case LOAD_USER:
      return {
        jwtToken: action?.payload?.jwtToken,
        account: action?.payload?.account,
        id: action?.payload?.id,
      };
    default:
      return state;
  }
}
