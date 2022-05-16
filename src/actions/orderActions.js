import axios from "axios";
import constants from "../utils/constants";
import {
  GET_ORDERS,
  GET_ORDER,
  GET_FIATS,
  GET_TOKENS,
  GET_PAYMENTS,
  CREATE_NEW_ORDER,
  GET_ERRORS,
} from "./types";

let baseUrl = constants.backend_url;

// GET
// Latest orders in the market
export const getLatestOrders =
  (orderType, orderDir, paymentOption, fiat, token) => async (dispatch) => {
    let url = `${baseUrl}/order-apis/v1/orders/1`;
    console.log(paymentOption.toLowerCase());
    let params = {
      params: {
        order_type: orderType,
        order_by: "order_amount",
        order_direction: "desc",
        payment_option: paymentOption === "all" ? null : paymentOption,
        order_status: "active",
        fiat: fiat,
        token: token,
      },
    };

    let response = axios
      .get(url, params)
      .then((res) => {
        dispatch({
          type: GET_ORDERS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
    return response;
  };

// GET
// All Tokens
export const getAllTokens = () => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order-apis/v1/order-tokens`)
    .then((res) => {
      dispatch({
        type: GET_TOKENS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  return response;
};

// GET
// All Fiat
export const getAllFiats = () => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order-apis/v1/fiats`)
    .then((res) => {
      dispatch({
        type: GET_FIATS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  return response;
};

// GET
// All Payment Options
export const getAllPaymentOptions = () => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order-apis/v1/payment_options`)
    .then((res) => {
      dispatch({
        type: GET_PAYMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  return response;
};

// POST
// CREATE SELL ORDER
export const createSellOrder = () => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order_apis/v1/create_sell_order`)
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  return response;
};

// POST
// CREATE BUY ORDER
export const createBuyOrder = (orderObject) => (dispatch) => {
  console.log("hello");

  let response = axios
    .post(`${baseUrl}/order-apis/v1/buy-order`, orderObject)
    .then((res) => {
      console.log("hello");
      dispatch({
        type: CREATE_NEW_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  return response;
};

// POST
// CREATE BUY ORDER
export const verifyTokenDeposit = () => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order_apis/v1/verify_deposit`)
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  return response;
};

// GET
// Single order detail
export const getOrderDetailsById = (id) => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order-apis/v1/order/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
  return response;
};
