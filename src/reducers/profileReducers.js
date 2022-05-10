import { GET_PROFILE } from "../actions/types";

const initalState = {
  profile: null,
};

export default function Orders(state = initalState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
}
