import { LOAD_USER, SIGN_MESSAGE } from "../actions/types";

const initalState = {
  jwtToken: null,
  sign_message: null,
  user: null,
};

export default function (state = initalState, action) {
  // todo design and write action types and state updates
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        ...action.payload,
      };
    case SIGN_MESSAGE:
      return {
        ...state,
        sign_message: action.payload,
      };

    default:
      return state;
  }
}
