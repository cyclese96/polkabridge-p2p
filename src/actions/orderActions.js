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

    if (!result) {
      dispatch({
        type: GET_ERRORS,
        payload: "failed to fetch orders",
      });
      return;
    }

    dispatch({
      type: GET_ORDERS,
      payload: result,
    });
  };

// GET
// All Tokens
export const getAllTokens = () => async (dispatch) => {
  const result = await getTokens();

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      payload: "failed to fetch tokens",
    });
    return;
  }

  dispatch({
    type: GET_TOKENS,
    payload: result,
  });
};

// GET
// All Fiat
export const getAllFiats = () => async (dispatch) => {
  const result = await getFiats();

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      payload: "failed to fetch fiats",
    });
    return;
  }

  dispatch({
    type: GET_FIATS,
    payload: result,
  });
};

// GET
// All Payment Options
export const getAllPaymentOptions = () => async (dispatch) => {
  const result = await getGlobalPaymentOptions();

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      payload: "failed to fetch global payments",
    });
    return;
  }

  dispatch({
    type: GET_PAYMENTS,
    payload: result,
  });
};

// POST
// CREATE SELL ORDER
export const createSellOrder = (orderObject) => async (dispatch) => {
  dispatch({ type: RESET_NEW_ORDER });

  const result = await createOrder("sell", orderObject);

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      payload: "failed to create sell order",
    });
    return;
  }

  dispatch({
    type: GET_ORDER,
    payload: result,
  });

  dispatch({ type: RESET_NEW_ORDER });
};

// POST
// CREATE BUY ORDER
export const createBuyOrder = (orderObject) => async (dispatch) => {
  dispatch({ type: RESET_NEW_ORDER });

  const result = await createOrder("buy", orderObject);

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      payload: "failed to create buy order",
    });
    return;
  }

  dispatch({
    type: GET_ORDER,
    payload: result,
  });

  dispatch({ type: RESET_NEW_ORDER });
};

// // POST
// // CREATE BUY ORDER
// export const verifyTokenDeposit = () => (dispatch) => {
//   let response = axios
//     .get(`${baseUrl}/order_apis/v1/verify_deposit`, { headers: headerObj })
//     .then((res) => {
//       dispatch({
//         type: GET_ORDERS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err,
//       });
//     });
//   return response;
// };

// GET
// Single order detail
export const getOrderDetailsById = (id) => async (dispatch) => {
  const result = await getOrderById(id);

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      payload: "failed to fetch order",
    });
    return;
  }

  dispatch({
    type: GET_ORDER,
    payload: result,
  });
};
