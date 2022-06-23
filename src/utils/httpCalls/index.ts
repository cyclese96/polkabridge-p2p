export const globalHeaders = {
  "Content-Type": "application/json;charset=UTF-8",
  "Access-Control-Allow-Origin": "*",
};

export const BASE_API_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? process.env?.REACT_APP_BACKEND_URI_DEV
    : process.env.REACT_APP_BACKEND_URI_PROD;

export * from "./orderCalls";
export * from "./userCalls";
