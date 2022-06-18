import axios from "axios";

let globalHeaders = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env?.REACT_APP_BACKEND_URI_DEV
    : process.env.REACT_APP_BACKEND_URI_PROD;

export const getUser = async () => {
  try {
    const result = await axios.get(`${baseUrl}/auth-apis/v1/user`, {
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
    const result = await axios.put(`${baseUrl}/auth-apis/v1/user`, updateData, {
      headers: { ...globalHeaders, "x-auth-token": localStorage.user },
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
    let result;

    if (!updateData?._id) {
      console.log("adding new payment option");
      result = await axios.put(
        `${baseUrl}/auth-apis/v1/user/payment-option`,
        updateData,
        { headers: { ...globalHeaders, "x-auth-token": localStorage.user } }
      );
    } else {
      console.log("updating  existing payment option");
      result = await axios.put(
        `${baseUrl}/auth-apis/v1/user/payment-option/${updateData?._id}`,
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
      `${baseUrl}/auth-apis/v1/user/payment-option`,
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

// order calls

export const getOrders = async (page: number, params: any, token: string) => {
  try {
    const result = await axios.get(
      `${baseUrl}/order-apis/v1/orders/${page || 1}`,
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
    const result = await axios.get(`${baseUrl}/order-apis/v1/order/${id}`, {
      headers: { ...globalHeaders, "x-auth-token": localStorage.user },
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
      headers: { ...globalHeaders, "x-auth-token": localStorage.user },
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
    const result = await axios.get(`${baseUrl}/order-apis/v1/payment_options`, {
      headers: { ...globalHeaders, "x-auth-token": localStorage.user },
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
          headers: { ...globalHeaders, "x-auth-token": localStorage.user },
        }
      );
    } else {
      response = await axios.post(
        `${baseUrl}/order-apis/v1/buy-order`,
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
      `${baseUrl}/order-apis/v1/verify-deposit/${orderId}`,
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
