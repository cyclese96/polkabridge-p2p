import axios from "axios";
import constants from "../utils/constants";
import { GET_ORDERS, GET_ORDER, GET_ERRORS } from "./types";
let baseUrl = constants.backend_url;

// GET
// Latest orders in the market
export const getLatestOrders = () => (dispatch) => {
  axios
    .get(`${baseUrl}/orders`)
    .then((res) => {
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
  return response;
};

// GET
// Single order detail
export const getOrderDetailsById = (id) => (dispatch) => {
  axios
    .get(`${baseUrl}/orders/${id}`)
    .then((res) => {
      dispatch({
        type: GET_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
  return response;
};
