import axios from "axios";
import {
  createOrder,
  getFiats,
  getGlobalPaymentOptions,
  getOrderById,
  getOrders,
  getTokens,
} from "../utils/httpCalls";
import {
  GET_ORDERS,
  GET_ORDER,
  GET_FIATS,
  GET_TOKENS,
  GET_PAYMENTS,
  CREATE_NEW_ORDER,
  GET_ERRORS,
  RESET_NEW_ORDER,
} from "./types";

// GET
// Latest orders in the market
export const getLatestOrders =
  (pageNumber, orderType, orderDir, paymentOption, fiat, token) =>
  async (dispatch) => {
    let paramsObj = {
      order_type: orderType,
      order_by: "order_amount",
      order_direction: "desc",
      payment_option: paymentOption === "all" ? null : paymentOption,
      order_status: "active",
      fiat: fiat,
      token: "6263a3e538fd8c30a7c4d8b5",
    };

    const result = await getOrders(pageNumber, paramsObj);

    if (result?.status !== 200) {
      dispatch({
        type: GET_ERRORS,
        payload: result.message,
      });
      return;
    }

    dispatch({
      type: GET_ORDERS,
      payload: result.data,
    });
  };

// GET
// All Tokens
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

// GET
// All Fiat
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
