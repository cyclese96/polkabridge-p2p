import { useCallback, useEffect, useMemo, useState } from "react";
import { createOrder, verifyDeposit } from "../utils/httpCalls";
import { CreateOrderStatus, CreateStatus } from "../utils/interface";
import useActiveWeb3React from "./useActiveWeb3React";

export function useCreateOrderCallback(): [
  CreateOrderStatus,
  (payload: any) => {},
  (payload: any) => {},
  (id: string) => {}
  //   () => void
] {
  const { chainId, account } = useActiveWeb3React();

  // order status:
  // pending: order is still not pushed to db
  // submitted: order is pushed to db but not active
  // active: order is active and pushed to database
  // failed: order creation failed with error message
  const initialState: CreateOrderStatus = {
    type: "none",
    id: null,
    status: CreateStatus.PENDING,
    loading: false,
    error: "",
  };
  const [orderStatus, setStatus] = useState<CreateOrderStatus>(initialState);

  const createSellOrder = useCallback(
    async (payload: any) => {
      setStatus({ ...initialState, type: "sell", loading: true });
      const response = await createOrder("sell", payload);
      console.log("sell order submitted ", response?.data);
      if (response.status === 201) {
        setStatus({
          ...orderStatus,
          loading: false,
          id: response?.data?._id,
          status: CreateStatus.SUBMITTED,
        });
      } else {
        setStatus({
          ...orderStatus,
          loading: false,
          error: response?.message,
          status: CreateStatus.FAILED,
        });
      }
    },
    [chainId]
  );

  const validateSellOrder = useCallback(
    async (id: string) => {
      setStatus({ ...orderStatus, type: "sell", loading: true });
      const response = await verifyDeposit(id);
      console.log("sell order validated ", response);
      if (response.status === 200) {
        setStatus({
          ...orderStatus,
          loading: false,
          status: CreateStatus.ACTIVE,
        });
      } else {
        console.log("sell order validation failed ", response?.message);
        setStatus({
          ...orderStatus,
          loading: false,
          error: response?.message,
          status: CreateStatus.FAILED,
        });
      }
    },
    [chainId]
  );

  const createBuyOrder = useCallback(
    async (payload: any) => {
      setStatus({ ...initialState, type: "buy", loading: true });
      const response = await createOrder("buy", payload);
      console.log("buy order created ", response);
      if (response.status === 201) {
        setStatus({
          ...orderStatus,
          loading: false,
          id: response?.data?._id,
          status: CreateStatus.ACTIVE,
        });
      } else {
        setStatus({
          ...orderStatus,
          loading: false,
          error: response?.message,
          status: CreateStatus.FAILED,
        });
      }
    },
    [chainId, setStatus]
  );

  //   const resetCreateState = useCallback(() => {
  //     setStatus(initialState);
  //   }, [setStatus]);

  //   useEffect(() => {
  //     resetCreateState();
  //   }, [resetCreateState]);

  const status = useMemo(() => {
    return orderStatus;
  }, [orderStatus, chainId]);

  return [orderStatus, createBuyOrder, createSellOrder, validateSellOrder];
}
