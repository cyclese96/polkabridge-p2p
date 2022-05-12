import {
  GET_ORDERS,
  GET_ORDER,
  GET_TOKENS,
  GET_FIATS,
  GET_PAYMENTS,
  CREATE_NEW_ORDER,
} from "../actions/types";

const initalState = {
  orders: [],
  order: null,
  fiats: [],
  tokens: [],
  payments: [],
};

export default function Orders(state = initalState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case GET_TOKENS:
      return {
        ...state,
        tokens: action.payload,
      };
    case GET_FIATS:
      return {
        ...state,
        fiats: action.payload,
      };
    case GET_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
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
