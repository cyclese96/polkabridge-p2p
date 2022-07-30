import {
  createOrder,
  fetchMarketPrice,
  getOrderById,
  getOrders,
} from "../utils/httpCalls";
import { createTrade } from "../utils/httpCalls/orderTradeCalls";
import {
  GET_ORDERS,
  GET_ORDER,
  GET_ERRORS,
  RESET_NEW_ORDER,
  GET_USER_ORDERS,
  SET_ORDER_LOADING,
  SET_BUY_MARKET_PRICE,
  SET_SELL_MARKET_PRICE,
} from "./types";

// Latest orders in the market
export const getLatestOrders =
  (pageNumber, filters = {}, authToken) =>
  async (dispatch) => {
    dispatch({
      type: SET_ORDER_LOADING,
      payload: true,
    });

    const result = await getOrders(pageNumber, filters, authToken);

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

// Latest orders in the market
export const getUserOrders =
  (pageNumber, filters = {}, authToken) =>
  async (dispatch) => {
    dispatch({
      type: SET_ORDER_LOADING,
      payload: true,
    });

    const result = await getOrders(pageNumber, filters, authToken);

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

    dispatch({
      type: GET_USER_ORDERS,
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

export const getOrderDetailsById = (id, authToken) => async (dispatch) => {
  const result = await getOrderById(id, authToken);

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

export const getCurrenctMarketPrice =
  (tokenId, fiatId, authToken) => async (dispatch) => {
    const [buyOrderRes, sellOrderRes] = await Promise.all([
      fetchMarketPrice("buy", tokenId, fiatId, authToken),
      fetchMarketPrice("sell", tokenId, fiatId, authToken),
    ]);

    if (buyOrderRes?.status === 200) {
      dispatch({
        type: SET_BUY_MARKET_PRICE,
        payload: {
          current: buyOrderRes?.data?.current_price,
          allTime: buyOrderRes?.data?.all_time_price,
        },
      });
    }

    if (sellOrderRes?.status === 200) {
      dispatch({
        type: SET_SELL_MARKET_PRICE,
        payload: {
          current: sellOrderRes?.data?.current_price,
          allTime: sellOrderRes?.data?.all_time_price,
        },
      });
    }
  };
