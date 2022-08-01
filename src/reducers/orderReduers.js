import {
  GET_ORDERS,
  GET_ORDER,
  GET_TOKENS,
  GET_FIATS,
  GET_PAYMENTS,
  CREATE_NEW_ORDER,
  RESET_NEW_ORDER,
  GET_USER_ORDERS,
  SET_ORDER_LOADING,
  SET_BUY_MARKET_PRICE,
  SET_SELL_MARKET_PRICE,
} from "../actions/types";

const initalState = {
  orders: [],
  order: {},
  buyMarketPrice: {
    current: 0,
    allTime: 0,
  },
  sellMarketPrice: {
    current: 0,
    allTime: 0,
  },
  userOrders: [],
  orderLoading: false,
  fiats: [],
  tokens: [],
  payments: [],
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case GET_USER_ORDERS:
      return {
        ...state,
        userOrders: [...action.payload],
      };
    case SET_ORDER_LOADING:
      return {
        ...state,
        orderLoading: action.payload,
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
    case RESET_NEW_ORDER:
      return {
        ...state,
        order: {},
      };
    case SET_BUY_MARKET_PRICE:
      return {
        ...state,
        buyMarketPrice: {
          ...state.buyMarketPrice,
          current: action.payload?.current,
          allTime: action.payload?.allTime,
        },
      };
    case SET_SELL_MARKET_PRICE:
      return {
        ...state,
        sellMarketPrice: {
          ...state.sellMarketPrice,
          current: action.payload?.current,
          allTime: action.payload?.allTime,
        },
      };
    default:
      return state;
  }
}
