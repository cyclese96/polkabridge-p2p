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
  RESET_NEW_ORDER,
} from "./types";

let baseUrl = constants.backend_url;

let headerObj = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  "x-auth-token":
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4NDljOGVlZmViZjE5OThiZmY0ZTQ3IiwiYWRkcmVzcyI6IjB4OTFmZDA5M2VhMGI5YzE0MjExNGNlNDhlOTFiNGI3NjM5NTVkNDM3YyJ9LCJpYXQiOjE2NTI4NTc5OTgsImV4cCI6MTY1MzcyMTk5OH0.DoNoNCuXQ5MaxWnfkweJ__sMLXbhbZghzU2G-4ckHl8",
};

// GET
// Latest orders in the market
export const getLatestOrders =
  (orderType, orderDir, paymentOption, fiat, token) => async (dispatch) => {
    let url = `${baseUrl}/order-apis/v1/orders/1`;
    console.log(paymentOption.toLowerCase());
    let paramsObj = {
      order_type: orderType,
      order_by: "order_amount",
      order_direction: "desc",
      payment_option: paymentOption === "all" ? null : paymentOption,
      order_status: "active",
      fiat: fiat,
      token: "6263a3e538fd8c30a7c4d8b5",
    };

    console.log("fetching orders");
    let response = axios
      .get(url, { params: paramsObj, headers: headerObj })
      .then((res) => {
        console.log("orders", res.data);
        dispatch({
          type: GET_ORDERS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("getLatestOrders orders", err);
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
    .get(`${baseUrl}/order-apis/v1/order-tokens`, { headers: headerObj })
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
    .get(`${baseUrl}/order-apis/v1/fiats`, { headers: headerObj })
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
    .get(`${baseUrl}/order-apis/v1/payment_options`, { headers: headerObj })
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
export const createSellOrder = (orderObject) => (dispatch) => {
  dispatch({ type: RESET_NEW_ORDER });
  let response = axios
    .post(`${baseUrl}/order-apis/v1/sell-order`, orderObject, {
      headers: headerObj,
    })
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("createSellOrder orders", err);
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
      dispatch({ type: RESET_NEW_ORDER });
    });
  return response;
};

// POST
// CREATE BUY ORDER
export const createBuyOrder = (orderObject) => (dispatch) => {
  console.log("hello");
  let response;

  dispatch({ type: RESET_NEW_ORDER });
  axios
    .post(`${baseUrl}/order-apis/v1/buy-order`, orderObject, {
      headers: headerObj,
    })
    .then((res) => {
      response = res;
      dispatch({
        type: CREATE_NEW_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      response = err;
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
      dispatch({ type: RESET_NEW_ORDER });
    });
  return response;
};

// POST
// CREATE BUY ORDER
export const verifyTokenDeposit = () => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order_apis/v1/verify_deposit`, { headers: headerObj })
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
    .get(`${baseUrl}/order-apis/v1/order/${id}`, { headers: headerObj })
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
