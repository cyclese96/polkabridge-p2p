import axios from "axios";

let headers = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
  "x-auth-token": localStorage.user,
};

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env?.REACT_APP_BACKEND_URI_DEV
    : process.env.REACT_APP_BACKEND_URI_PROD;

export const getUser = async () => {
  try {
    const result = await axios.get(`${baseUrl}/auth-apis/v1/user`, {
      headers: headers,
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
    const result = await axios.put(`${baseUrl}/auth-apis/v1/user`, updateData, {
      headers: headers,
    });

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
    const result = await axios.post(
      `${baseUrl}/auth-apis/v1/user/payment-option`,
      updateData,
      { headers: headers }
    );

    return { status: result?.status, data: result?.data?.payment_options };
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
      `${baseUrl}/auth-apis/v1/user/payment-option`,
      updateData,
      { headers: headers }
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

// order calls

export const getOrders = async (page: number, params: any) => {
  try {
    const result = await axios.get(
      `${baseUrl}/order-apis/v1/orders/${page || 1}`,
      { params: params, headers: headers }
    );

    console.log("orders fetched ", result.data);
    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    console.log("getOrders ", error);
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const getOrderById = async (id: string) => {
  try {
    const result = await axios.get(`${baseUrl}/order-apis/v1/order/${id}`, {
      headers: headers,
    });

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
    const result = await axios.get(`${baseUrl}/order-apis/v1/order-tokens`, {
      headers: headers,
    });

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
    const result = await axios.get(`${baseUrl}/order-apis/v1/fiats`, {
      headers: headers,
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
    const result = await axios.get(`${baseUrl}/order-apis/v1/payment_options`, {
      headers: headers,
    });

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
        `${baseUrl}/order-apis/v1/sell-order`,
        payload,
        {
          headers: headers,
        }
      );
    } else {
      response = await axios.post(
        `${baseUrl}/order-apis/v1/buy-order`,
        payload,
        {
          headers: headers,
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
      `${baseUrl}/order-apis/v1/verify-deposit/${orderId}`,
      {},
      {
        headers: headers,
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
