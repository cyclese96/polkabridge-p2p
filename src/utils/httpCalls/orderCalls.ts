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

export const getOrderById = async (id: string, authToken: string) => {
  try {
    const result = await axios.get(
      `${BASE_API_ENDPOINT}/order-apis/v1/order/${id}`,
      {
        headers: { ...globalHeaders, "x-auth-token": authToken },
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

// export const getTokens = async () => {
//   try {
//     const result = await axios.get(
//       `${BASE_API_ENDPOINT}/order-apis/v1/order-tokens`,
//       {
//         headers: { ...globalHeaders, "x-auth-token": localStorage.user },
//       }
//     );

//     return { status: result?.status, data: result?.data };
//   } catch (error: any) {
//     console.log("getTokens ", error);
//     return {
//       status: error?.response?.status,
//       message: error?.response?.data?.message,
//     };
//   }
// };

// export const getFiats = async () => {
//   try {
//     const result = await axios.get(`${BASE_API_ENDPOINT}/order-apis/v1/fiats`, {
//       headers: { ...globalHeaders, "x-auth-token": localStorage.user },
//     });

//     return { status: result?.status, data: result?.data };
//   } catch (error: any) {
//     console.log("getFiats ", error);
//     return {
//       status: error?.response?.status,
//       message: error?.response?.data?.message,
//     };
//   }
// };

// export const getGlobalPaymentOptions = async () => {
//   try {
//     const result = await axios.get(
//       `${BASE_API_ENDPOINT}/order-apis/v1/payment_options`,
//       {
//         headers: { ...globalHeaders, "x-auth-token": localStorage.user },
//       }
//     );

//     return { status: result?.status, data: result?.data };
//   } catch (error: any) {
//     console.log("getGlobalPaymentOptions ", error);
//     return {
//       status: error?.response?.status,
//       message: error?.response?.data?.message,
//     };
//   }
// };

export const createOrder = async (
  orderType: string,
  payload: any,
  authToken: string
) => {
  try {
    let response;

    if (orderType === "sell") {
      response = await axios.post(
        `${BASE_API_ENDPOINT}/order-apis/v1/sell-order`,
        payload,
        {
          headers: { ...globalHeaders, "x-auth-token": authToken },
        }
      );
    } else {
      response = await axios.post(
        `${BASE_API_ENDPOINT}/order-apis/v1/buy-order`,
        payload,
        {
          headers: { ...globalHeaders, "x-auth-token": authToken },
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

export const verifyDeposit = async (orderId: string, authToken: string) => {
  try {
    if (!orderId) {
      return { status: false, data: null };
    }

    const result = await axios.patch(
      `${BASE_API_ENDPOINT}/order-apis/v1/verify-deposit/${orderId}`,
      {},
      {
        headers: { ...globalHeaders, "x-auth-token": authToken },
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

// token deposts used in all sell orders
export const fetchUserTotalActiveDeposits = async (
  token_id: string | undefined,
  authToken: string
) => {
  try {
    let response;
    console.log("token address", token_id);
    response = await axios.get(
      `${BASE_API_ENDPOINT}/order-apis/v1/active-deposits/${token_id}`,
      { headers: { ...globalHeaders, "x-auth-token": authToken } }
    );

    return { status: response?.status, data: response?.data };
  } catch (error: any) {
    console.log("fetchUserTotalActiveDeposits ", { error });
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

//  fetch current buy / sell order highest market price
export const fetchMarketPrice = async (
  orderType: string,
  tokenId: string,
  fiatId: string,
  authToken: string
) => {
  try {
    const response = await axios.get(
      `${BASE_API_ENDPOINT}/order-apis/v1/current-market-price/${orderType}/${tokenId}/${fiatId}`,
      { headers: { ...globalHeaders, "x-auth-token": authToken } }
    );

    const data = await response.data;

    return {
      status: response?.status,
      data: {
        current_price: data?.current_order?.order_unit_price,
        all_time_price: data?.all_time_order?.order_unit_price,
      },
    };
  } catch (error: any) {
    console.log("fetchUserTrades ", { error });
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
