import { LOAD_USER } from "../actions/types";

const initalState = {
  jwtToken: null,
  account: null,
  userId: null,
};

export default function (state = initalState, action) {
  // todo design and write action types and state updates
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
