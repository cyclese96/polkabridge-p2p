import {
  CREATE_TRADE_LOADING,
  FETCH_TRADE_LOADING,
  GET_TRADE,
  GET_TRADES,
  TRADE_ERROR,
} from "../actions/types";

const initalState = {
  trades: [],
  trade: {},
  createTradeLoading: false,
  fetchTradeLoading: false,
  tradeError: "",
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_TRADES:
      return {
        ...state,
        trades: [...action.payload],
      };
    case GET_TRADE:
      return {
        ...state,
        trade: [...action.payload],
      };
    case CREATE_TRADE_LOADING:
      return {
        ...state,
        createTradeLoading: action.payload,
      };
    case FETCH_TRADE_LOADING:
      return {
        ...state,
        fetchTradeLoading: action.payload,
      };

    case TRADE_ERROR:
      return {
        ...state,
        tradeError: action.payload,
      };

    default:
      return state;
  }
}
