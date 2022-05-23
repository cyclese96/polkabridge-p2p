import {
  GET_PROFILE,
  UPDATE_PAYMENTS,
  UPDATE_CURRENCY,
  GET_ERRORS,
} from "./types";
import {
  getUser,
  updateDefaultCurrency,
  updatePayments,
  updateProfile,
} from "../utils/httpCalls";

export const getUserProfile = () => async (dispatch) => {
  const result = await getUser();

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      pyaload: "Failed to fetch user",
    });
  }
  dispatch({
    type: GET_PROFILE,
    payload: result,
  });
};

// POST
// UPDATE USER PROFILE DATA
export const updateUserProfile = (data) => async (dispatch) => {
  const result = await updateProfile(data);

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      pyaload: "Failed to update user profile",
    });
  }
  dispatch({
    type: GET_PROFILE,
    payload: result,
  });
};

// POST
// UPDATE USER PAYMENT PREFERENCES
export const updateUserPaymentPreferences = (data) => async (dispatch) => {
  const result = await updatePayments(data);

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      pyaload: "Failed to update user payments",
    });
  }
  dispatch({
    type: UPDATE_PAYMENTS,
    payload: result,
  });
};

// POST
// UPDATE USER PAYMENT PREFERENCES
export const updateUserCurrency = (data) => async (dispatch) => {
  const result = await updateDefaultCurrency(data);

  if (!result) {
    dispatch({
      type: GET_ERRORS,
      pyaload: "Failed to update user default currency",
    });
  }
  dispatch({
    type: UPDATE_CURRENCY,
    payload: result,
  });
};
