import axios from "axios";
import { globalHeaders } from "./index";
import { BASE_API_ENDPOINT } from "./index";

// order calls

export const getOrders = async (page: number, params: any, token: string) => {
  try {
    const result = await axios.get(
      `${BASE_API_ENDPOINT}/order-apis/v1/orders/${page || 1}`,
      { params: params, headers: { ...globalHeaders, "x-auth-token": token } }
    );

    console.log("orders fetched ", {
      result: result.data,
      params,
      token,
      page,
    });
    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("getOrders ", { error, params, token, page });
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getOrderById = async (id: string) => {
  try {
    const result = await axios.get(
      `${BASE_API_ENDPOINT}/order-apis/v1/order/${id}`,
      {
        headers: { ...globalHeaders, "x-auth-token": localStorage.user },
      }
    );

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("getOrders ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getTokens = async () => {
  try {
    const result = await axios.get(
      `${BASE_API_ENDPOINT}/order-apis/v1/order-tokens`,
      {
        headers: { ...globalHeaders, "x-auth-token": localStorage.user },
      }
    );

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("getTokens ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getFiats = async () => {
  try {
    const result = await axios.get(`${BASE_API_ENDPOINT}/order-apis/v1/fiats`, {
      headers: { ...globalHeaders, "x-auth-token": localStorage.user },
    });

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("getFiats ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getGlobalPaymentOptions = async () => {
  try {
    const result = await axios.get(
      `${BASE_API_ENDPOINT}/order-apis/v1/payment_options`,
      {
        headers: { ...globalHeaders, "x-auth-token": localStorage.user },
      }
    );

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("getGlobalPaymentOptions ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const createOrder = async (orderType: string, payload: any) => {
  try {
    let response;

    if (orderType === "sell") {
      response = await axios.post(
        `${BASE_API_ENDPOINT}/order-apis/v1/sell-order`,
        payload,
        {
          headers: { ...globalHeaders, "x-auth-token": localStorage.user },
        }
      );
    } else {
      response = await axios.post(
        `${BASE_API_ENDPOINT}/order-apis/v1/buy-order`,
        payload,
        {
          headers: { ...globalHeaders, "x-auth-token": localStorage.user },
        }
      );
    }

    return { status: response?.status, data: response?.data };
  } catch (error: any) {
    console.log("getGlobalPaymentOptions ", { error });
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const verifyDeposit = async (orderId: string) => {
  try {
    if (!orderId) {
      return { status: false, data: null };
    }

    const result = await axios.patch(
      `${BASE_API_ENDPOINT}/order-apis/v1/verify-deposit/${orderId}`,
      {},
      {
        headers: { ...globalHeaders, "x-auth-token": localStorage.user },
      }
    );

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("error ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
