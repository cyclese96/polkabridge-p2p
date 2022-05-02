import axios from "axios";
import constants from "../utils/constants";
import { GET_ORDERS, GET_ORDER, GET_ERRORS } from "./types";

let baseUrl = constants.backend_url;

// GET
// Latest orders in the market
export const getLatestOrders = () => async (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order_apis/v1/orders/1`)
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
    .get(`${baseUrl}/order_apis/v1/order_tokens`)
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
export const createBuyOrder = () => (dispatch) => {
  let response = axios
    .get(`${baseUrl}/order_apis/v1/create_buy_order`)
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
    .get(`${baseUrl}/order_apis/v1/orders/${id}`)
    .then((res) => {
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
