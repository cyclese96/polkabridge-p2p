import axios from "axios";
import { globalHeaders } from "./index";
import { BASE_API_ENDPOINT } from "./index";

export const getUser = async (
  account: string,
  authToken: string | undefined
) => {
  try {
    const result = await axios.get(`${BASE_API_ENDPOINT}/auth-apis/v1/user`, {
      headers: {
        ...globalHeaders,
        "x-auth-token": authToken ? authToken : localStorage.getItem(account),
      },
    });

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("getUser ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const updateProfile = async (updateData: any, authToken: string) => {
  try {
    const result = await axios.put(
      `${BASE_API_ENDPOINT}/auth-apis/v1/user`,
      updateData,
      {
        headers: { ...globalHeaders, "x-auth-token": authToken },
      }
    );

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("updateProfile ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const updatePayments = async (updateData: any, authToken: string) => {
  try {
    let result;

    if (!updateData?._id) {
      console.log("adding new payment option");
      result = await axios.put(
        `${BASE_API_ENDPOINT}/auth-apis/v1/user/payment-option`,
        updateData,
        { headers: { ...globalHeaders, "x-auth-token": authToken } }
      );
    } else {
      console.log("updating  existing payment option");
      result = await axios.put(
        `${BASE_API_ENDPOINT}/auth-apis/v1/user/payment-option/${updateData?._id}`,
        updateData,
        { headers: { ...globalHeaders, "x-auth-token": authToken } }
      );
    }

    console.log("payment method updated", result);

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("updatePayments ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const updateDefaultCurrency = async (
  updateData: any,
  authToken: string
) => {
  try {
    const result = await axios.post(
      `${BASE_API_ENDPOINT}/auth-apis/v1/user/payment-option`,
      updateData,
      { headers: { ...globalHeaders, "x-auth-token": authToken } }
    );

    return { status: result?.status, data: result?.data?.fiat };
  } catch (error: any) {
    console.log("updateDefaultCurrency ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
