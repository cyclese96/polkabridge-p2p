import {
  createTrade,
  fetchUserTradeById,
  fetchUserTrades,
} from "../utils/httpCalls/orderTradeCalls";
import {
  CREATE_TRADE_LOADING,
  FETCH_TRADE_LOADING,
  GET_TRADE,
  GET_TRADES,
  TRADE_ERROR,
} from "./types";

export const startOrderTrade =
  (authToken, tradeType, tradeInput) => async (dispatch) => {
    dispatch({ type: CREATE_TRADE_LOADING, payload: true });
    const requestBody = {
      order_id: tradeInput?.orderId,
      token_amount: tradeInput?.tokenAmount,
      fiat_amount: tradeInput?.fiatAmoount,
    };

    const result = await createTrade(tradeType, requestBody, authToken);

    dispatch({ type: CREATE_TRADE_LOADING, payload: false });

    if (result?.status !== 201) {
      dispatch({
        type: TRADE_ERROR,
        payload: result.message,
      });
      return;
    }
    dispatch({
      type: GET_TRADE,
      payload: result.data,
    });
  };

export const getUserTrades =
  (authToken, tradeType, tradeStatus) => async (dispatch) => {
    dispatch({ type: FETCH_TRADE_LOADING, payload: true });

    const filterObject = {
      transaction_status: tradeStatus,
      order_type: tradeType,
    };

    const result = await fetchUserTrades(filterObject, authToken);

    dispatch({ type: FETCH_TRADE_LOADING, payload: false });

    if (result?.status !== 200) {
      dispatch({
        type: TRADE_ERROR,
        payload: result.message,
      });
      return;
    }
    dispatch({
      type: GET_TRADES,
      payload: result.data,
    });
  };

export const getUserTradeById = (authToken, tradeId) => async (dispatch) => {
  dispatch({ type: FETCH_TRADE_LOADING, payload: true });

  const result = await fetchUserTradeById(tradeId, authToken);

  dispatch({ type: FETCH_TRADE_LOADING, payload: false });
  if (result?.status !== 200) {
    dispatch({
      type: TRADE_ERROR,
      payload: result.message,
    });
    return;
  }
  dispatch({
    type: GET_TRADE,
    payload: result.data,
  });
};
