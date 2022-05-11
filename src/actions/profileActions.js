import axios from "axios";
import {
  GET_PROFILE,
  UPDATE_PAYMENTS,
  UPDATE_CURRENCY,
  GET_ERRORS,
} from "./types";
import constants from "../utils/constants";

let baseUrl = constants.backend_url;

// GET
// user profile
export const getUserProfile = () => (dispatch) => {
  let config = {
    headers: {
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ODYwYWExZWQyZWI1ZGE2ZGQ3NmMxIiwiYWRkcmVzcyI6IjB4YWMxMTNhODYzZTg3MWNhMDA3ZGQxYmU4YmUxMjU2MzYwMjUwMmE2ZCJ9LCJpYXQiOjE2NTE3Mzg0NTcsImV4cCI6MTY1MjYwMjQ1N30.LU8fdNQeTpsLASsgWrBY7eebzg1wKdvQ9Op6fAJtjRo",
    },
  };

  let response = axios
    .get(`${baseUrl}/auth-apis/v1/user`, config)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
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
// UPDATE USER PROFILE DATA
export const updateUserProfile = (data) => (dispatch) => {
  let config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1ODYwYWExZWQyZWI1ZGE2ZGQ3NmMxIiwiYWRkcmVzcyI6IjB4YWMxMTNhODYzZTg3MWNhMDA3ZGQxYmU4YmUxMjU2MzYwMjUwMmE2ZCJ9LCJpYXQiOjE2NTE3Mzg0NTcsImV4cCI6MTY1MjYwMjQ1N30.LU8fdNQeTpsLASsgWrBY7eebzg1wKdvQ9Op6fAJtjRo",
    },
  };

  let response = axios
    .put(`${baseUrl}/auth-apis/v1/user`, data, config)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
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
// UPDATE USER PAYMENT PREFERENCES
export const updateUserPaymentPreferences = (data) => (dispatch) => {
  let response = axios
    .post(`${baseUrl}/auth-apis/v1/user/payment-option`, data)
    .then((res) => {
      dispatch({
        type: UPDATE_PAYMENTS,
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
// UPDATE USER PAYMENT PREFERENCES
export const updateUserCurrency = (data) => (dispatch) => {
  let response = axios
    .post(`${baseUrl}/auth-apis/v1/user/payment-option`, data)
    .then((res) => {
      dispatch({
        type: UPDATE_CURRENCY,
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
