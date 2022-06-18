import {
  GET_PROFILE,
  UPDATE_PAYMENTS,
  UPDATE_CURRENCY,
  GET_ERRORS,
  SET_PROFILE_LOADING,
} from "./types";
import {
  getUser,
  updateDefaultCurrency,
  updatePayments,
  updateProfile,
} from "../utils/httpCalls";

export const getUserProfile = () => async (dispatch) => {
  const result = await getUser();

  if (result?.status !== 200) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }
  dispatch({
    type: GET_PROFILE,
    payload: result.data,
  });
};

// POST
// UPDATE USER PROFILE DATA
export const updateUserProfile = (data) => async (dispatch) => {
  const result = await updateProfile(data);

  if (result?.status !== 201) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }
  dispatch({
    type: GET_PROFILE,
    payload: result.data,
  });
};

// POST
// UPDATE USER PAYMENT PREFERENCES
export const updateUserPaymentPreferences = (data) => async (dispatch) => {
  const result = await updatePayments(data);

  if (result?.status !== 201) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }

  dispatch({
    type: GET_PROFILE,
    payload: result.data,
  });
};

// POST
// UPDATE USER PAYMENT PREFERENCES
export const updateUserCurrency = (data) => async (dispatch) => {
  const result = await updateDefaultCurrency(data);

  if (result?.status !== 201) {
    dispatch({
      type: GET_ERRORS,
      payload: result.message,
    });
    return;
  }
  dispatch({
    type: UPDATE_CURRENCY,
    payload: result.data,
  });
};
