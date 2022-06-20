import {
  createOrder,
  getFiats,
  getGlobalPaymentOptions,
  getOrderById,
  getOrders,
  getTokens,
} from "../utils/httpCalls";
import { createTrade } from "../utils/httpCalls/orderTradeCalls";
import {
  GET_ORDERS,
  GET_ORDER,
  GET_FIATS,
  GET_TOKENS,
  GET_PAYMENTS,
  CREATE_NEW_ORDER,
  GET_ERRORS,
  RESET_NEW_ORDER,
  GET_USER_ORDERS,
  SET_ORDER_LOADING,
} from "./types";

// Latest orders in the market
export const getLatestOrders =
  (pageNumber, filters = {}, token) =>
  async (dispatch) => {
    dispatch({
      type: SET_ORDER_LOADING,
      payload: true,
    });

    const result = await getOrders(pageNumber, filters, token);

    dispatch({
      type: SET_ORDER_LOADING,
      payload: false,
    });

    if (result?.status !== 200) {
      dispatch({
        type: GET_ERRORS,
        payload: result.message,
      });

      return;
    }

    if (Object.keys(filters).includes("user")) {
      dispatch({
        type: GET_USER_ORDERS,
        payload: result.data,
      });
    } else {
      dispatch({
        type: GET_ORDERS,
        payload: result.data,
      });
    }
  };

export const getAllTokens = () => async (dispatch) => {
  const result = await getTokens();

  if (result?.status !== 200) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }

  dispatch({
    type: GET_TOKENS,
    payload: result.data,
  });
};

export const getAllFiats = () => async (dispatch) => {
  const result = await getFiats();

  if (result?.status !== 200) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }

  dispatch({
    type: GET_FIATS,
    payload: result.data,
  });
};

// GET
// All Payment Options
export const getAllPaymentOptions = () => async (dispatch) => {
  const result = await getGlobalPaymentOptions();

  if (result?.status !== 200) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }

  dispatch({
    type: GET_PAYMENTS,
    payload: result.data,
  });
};

// POST
// CREATE SELL ORDER
export const createSellOrder = (orderObject) => async (dispatch) => {
  dispatch({ type: RESET_NEW_ORDER });

  const result = await createOrder("sell", orderObject);

  if (result?.status !== 201) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }

  dispatch({
    type: GET_ORDER,
    payload: result.data,
  });

  dispatch({ type: RESET_NEW_ORDER });
};

// POST
// CREATE BUY ORDER
export const createBuyOrder = (orderObject) => async (dispatch) => {
  dispatch({ type: RESET_NEW_ORDER });

  const result = await createOrder("buy", orderObject);

  if (result?.status !== 201) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }

  dispatch({
    type: GET_ORDER,
    payload: result.data,
  });

  dispatch({ type: RESET_NEW_ORDER });
};

export const getOrderDetailsById = (id) => async (dispatch) => {
  const result = await getOrderById(id);

  if (result?.status !== 200) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }

  dispatch({
    type: GET_ORDER,
    payload: result.data,
  });
};
