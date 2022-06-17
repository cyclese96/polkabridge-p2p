// useGlobalOrders, filters: { orderType, fiat, token, orderBy,  }
// useUserOrders, filters: { active, ongoing, completed, cancelled }

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestOrders } from "../actions/orderActions";
import useActiveWeb3React from "./useActiveWeb3React";
import { useUserAuthentication } from "./useUserAuthentication";

export function useGlobalOrders(
  orderType: string
): [any, boolean, (page: any) => void, (filter: any) => void] {
  const { account, chainId } = useActiveWeb3React();
  const orders = useSelector((state: any) => state.order?.orders);
  const orderLoading = useSelector((state: any) => state?.order?.orderLoading);
  const dispatch = useDispatch();
  const [orderFilters, setFilters] = useState({ order_type: orderType });
  const [pageNumber, setPageNumber] = useState(1);
  const userAuth = useSelector((state: any) => state?.user);

  const applyFilter = useCallback(
    (filter: any) => {
      setFilters(filter);
    },
    [setFilters]
  );

  const updatePageNumber = useCallback(
    (page: number) => {
      setPageNumber(page);
    },
    [setPageNumber]
  );

  useEffect(() => {
    if (!chainId) {
      return;
    }
    dispatch(getLatestOrders(pageNumber, orderFilters, userAuth?.jwtToken));
  }, [account, chainId, orderFilters, pageNumber, userAuth]);

  return useMemo(() => {
    return [orders, orderLoading, updatePageNumber, applyFilter];
  }, [orders, orderLoading, updatePageNumber, applyFilter]);
}

export function useUserOrders(
  user: string
): [any, boolean, (page: any) => void, (filter: any) => void] {
  const { account, chainId } = useActiveWeb3React();
  const orders = useSelector((state: any) => state.order?.userOrders);
  const orderLoading = useSelector((state: any) => state?.order?.orderLoading);
  const dispatch = useDispatch();
  const [orderFilters, setFilters] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const userAuth = useSelector((state: any) => state?.user);

  const applyFilter = useCallback(
    (filter: any) => {
      setFilters(filter);
    },
    [setFilters]
  );

  const updatePageNumber = useCallback(
    (page: number) => {
      setPageNumber(page);
    },
    [setPageNumber]
  );

  useEffect(() => {
    if (!user || !userAuth?.jwtToken) {
      return;
    }
    console.log("fetching orders on auth status update", userAuth);
    // console.log("fetching user orders ", { pageNumber, orderFilters });
    dispatch(
      getLatestOrders(pageNumber, { ...orderFilters, user }, userAuth?.jwtToken)
    );
  }, [orderFilters, pageNumber, userAuth, user]);

  return useMemo(() => {
    return [orders, orderLoading, updatePageNumber, applyFilter];
  }, [orders, orderLoading, updatePageNumber, applyFilter, userAuth]);
}
