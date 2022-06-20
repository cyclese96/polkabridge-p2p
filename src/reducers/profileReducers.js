import { GET_PROFILE, SET_PROFILE_LOADING } from "../actions/types";

const initalState = {
  profile: null,
  loading: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_PROFILE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
