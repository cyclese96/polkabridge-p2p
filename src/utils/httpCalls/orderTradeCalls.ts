import axios from "axios";
import { globalHeaders } from "./index";
import { BASE_API_ENDPOINT } from "./index";

// order calls

export const createTrade = async (
  tradeType: string,
  requestBody: any,
  authToken: string
) => {
  try {
    let result;

    if (tradeType === "buy") {
      result = await axios.post(
        `${BASE_API_ENDPOINT}/transactions-apis/v1/buy-order/`,
        requestBody,
        { headers: { ...globalHeaders, "x-auth-token": authToken } }
      );
    } else if (tradeType === "sell") {
      result = await axios.post(
        `${BASE_API_ENDPOINT}/transactions-apis/v1/sell-order/`,
        requestBody,
        { headers: { ...globalHeaders, "x-auth-token": authToken } }
      );
    } else {
      return {};
    }

    return { status: result?.status, data: result?.data };
  } catch (error: any) {
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const fetchUserTrades = async (filter: any, authToken: string) => {
  try {
    let response;

    response = await axios.get(
      `${BASE_API_ENDPOINT}/transactions-apis/v1/order-transactions/`,
      {
        params: { transaction_status: filter.transaction_status },
        headers: { ...globalHeaders, "x-auth-token": authToken },
      }
    );

    return { status: response?.status, data: response?.data };
  } catch (error: any) {
    console.log("fetchUserTrades ", { error });
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};

export const fetchUserTradeById = async (id: string, authToken: string) => {
  try {
    let response;

    response = await axios.get(
      `${BASE_API_ENDPOINT}/transactions-apis/v1/order-transaction/${id}`,
      { headers: { ...globalHeaders, "x-auth-token": authToken } }
    );

    return { status: response?.status, data: response?.data };
  } catch (error: any) {
    console.log("fetchUserTrades ", { error });
    return {
      status: error?.response?.status,
      message: error?.response?.data?.message,
    };
  }
};
