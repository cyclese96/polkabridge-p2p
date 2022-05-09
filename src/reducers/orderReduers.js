import { GET_ORDERS, GET_ORDER, CREATE_NEW_ORDER } from "../actions/types";

const initalState = {
  order: null,
  orders: [],
};

export default function Orders(state = initalState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CREATE_NEW_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
}
