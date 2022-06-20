import axios from "axios";
import { globalHeaders } from "./index";
import { BASE_API_ENDPOINT } from "./index";

export const getUser = async () => {
  try {
    const result = await axios.get(`${BASE_API_ENDPOINT}/auth-apis/v1/user`, {
      headers: { ...globalHeaders, "x-auth-token": localStorage.user },
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

export const updateProfile = async (updateData: any) => {
  try {
    const result = await axios.put(
      `${BASE_API_ENDPOINT}/auth-apis/v1/user`,
      updateData,
      {
        headers: { ...globalHeaders, "x-auth-token": localStorage.user },
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

export const updatePayments = async (updateData: any) => {
  try {
    let result;

    if (!updateData?._id) {
      console.log("adding new payment option");
      result = await axios.put(
        `${BASE_API_ENDPOINT}/auth-apis/v1/user/payment-option`,
        updateData,
        { headers: { ...globalHeaders, "x-auth-token": localStorage.user } }
      );
    } else {
      console.log("updating  existing payment option");
      result = await axios.put(
        `${BASE_API_ENDPOINT}/auth-apis/v1/user/payment-option/${updateData?._id}`,
        updateData,
        { headers: { ...globalHeaders, "x-auth-token": localStorage.user } }
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

export const updateDefaultCurrency = async (updateData: any) => {
  try {
    const result = await axios.post(
      `${BASE_API_ENDPOINT}/auth-apis/v1/user/payment-option`,
      updateData,
      { headers: { ...globalHeaders, "x-auth-token": localStorage.user } }
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
