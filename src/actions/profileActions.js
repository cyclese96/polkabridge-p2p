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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3OTNhZWI3ZmQ4OWU2MzAzMzQxNGIxIiwiYWRkcmVzcyI6IjB4OWQ3MTE3YTA3ZmNhOWYyMjkxMWQzNzlhOWZkNTExOGE1ZmE0ZjQ0OCJ9LCJpYXQiOjE2NTIxNTI5MDUsImV4cCI6MTY1MzAxNjkwNX0.wi55fWt_2C46LkG_JkLHrCd0jYNjJ_09RvWFiM9msVI",
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
  let response = axios
    .post(`${baseUrl}/auth-apis/v1/user`, data)
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
