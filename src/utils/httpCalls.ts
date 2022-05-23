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
    let response = await axios.get(`${baseUrl}/auth-apis/v1/user`, {
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.log("getUser ", error);
    return null;
  }
};

export const updateProfile = async (updateData: any) => {
  try {
    let response = await axios.put(`${baseUrl}/auth-apis/v1/user`, updateData, {
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.log("updateProfile ", error);
    return {};
  }
};

export const updatePayments = async (updateData: any) => {
  try {
    let response = await axios.post(
      `${baseUrl}/auth-apis/v1/user/payment-option`,
      updateData,
      { headers: headers }
    );

    return response?.data?.payment_options;
  } catch (error) {
    console.log("updatePayments ", error);
    return [];
  }
};

export const updateDefaultCurrency = async (updateData: any) => {
  try {
    let response = await axios.post(
      `${baseUrl}/auth-apis/v1/user/payment-option`,
      updateData,
      { headers: headers }
    );

    return response?.data?.fiat;
  } catch (error) {
    console.log("updateDefaultCurrency ", error);
    return {};
  }
};

// order calls

export const getOrders = async (page: number, params: any) => {
  try {
    let response = await axios.get(
      `${baseUrl}/order-apis/v1/orders/${page || 1}`,
      { params: params, headers: headers }
    );

    return response?.data;
  } catch (error) {
    console.log("getOrders ", error);
    return {};
  }
};

export const getOrderById = async (id: string) => {
  try {
    let response = await axios.get(`${baseUrl}/order-apis/v1/order/${id}`, {
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.log("getOrders ", error);
    return {};
  }
};

export const getTokens = async () => {
  try {
    let response = await axios.get(`${baseUrl}/order-apis/v1/order-tokens`, {
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.log("getTokens ", error);
    return [];
  }
};

export const getFiats = async () => {
  try {
    let response = await axios.get(`${baseUrl}/order-apis/v1/fiats`, {
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.log("getFiats ", error);
    return [];
  }
};

export const getGlobalPaymentOptions = async () => {
  try {
    let response = await axios.get(`${baseUrl}/order-apis/v1/payment_options`, {
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.log("getGlobalPaymentOptions ", error);
    return [];
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

    return response?.data;
  } catch (error) {
    console.log("getGlobalPaymentOptions ", error);
    return {};
  }
};

export const verifyDeposit = async () => {
  try {
    const result = await axios.get(`${baseUrl}/order_apis/v1/verify_deposit`, {
      headers: headers,
    });

    return result?.data;
  } catch (error) {
    console.log("error ", error);
    return false;
  }
};
