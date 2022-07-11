import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useSingleCallResult } from "../state/multicall/hooks";
import { toWei } from "../utils/helper";
import { fetchUserTotalActiveDeposits } from "../utils/httpCalls";
import { TransactionStatus, Token, TransactionState } from "../utils/interface";
import useActiveWeb3React from "./useActiveWeb3React";
import useBlockNumber from "./useBlockNumber";
import { useP2pContract } from "./useContract";
import BigNumber from "bignumber.js";

export function useDepositCallback(
  token?: Token
): [() => {}, () => {}, () => void, TransactionStatus, string] {
  const { library, account } = useActiveWeb3React();
  const p2pContract = useP2pContract();
  const initialState: TransactionStatus = {
    hash: "",
    status: null,
    state: 0,
  };
  const [data, setData] = useState<TransactionStatus>(initialState);
  const [activeDeposits, setActiveDeposits] = useState("0");
  const blockNumber = useBlockNumber();
  const userAuth = useSelector((state: any) => state?.user);
  const [loading, setLoading] = useState(false);

  const depositRes = useSingleCallResult(p2pContract, "getUserInfo", [
    account ? account : "",
    token?.address,
  ]).result;

  const userDeposit = useMemo(() => {
    if (token && depositRes) {
      return new BigNumber(depositRes?._amount?.toString())
        .minus(activeDeposits)
        ?.toString();
    }

    return "0";
  }, [token, depositRes, blockNumber, activeDeposits]);

  let stakeRes: any = null;

  const depositTokens = useCallback(
    async (tokenAmount?: string) => {
      try {
        const depositTokens = tokenAmount;
        setData({ ...data, status: TransactionState.WAITING, state: 1 });

        stakeRes = await p2pContract?.depositToken(
          token?.address,
          depositTokens
        );
        setData({
          ...data,
          hash: stakeRes?.hash,
          status: TransactionState.PENDING,
          state: 2,
        });
      } catch (error) {
        setData({ ...data, status: TransactionState.FAILED, state: 4 });

        console.log("depositTokens trx error ", { error });
      }
    },
    [p2pContract, token, setData]
  );

  const withdrawTokens = useCallback(async () => {
    try {
      setData({ ...data, status: TransactionState.WAITING, state: 1 });

      const res = await p2pContract?.withdrawToken(token?.address);

      setData({
        ...data,
        hash: res?.hash,
        status: TransactionState.PENDING,
        state: 2,
      });
    } catch (error) {
      setData({ ...data, status: TransactionState.FAILED, state: 4 });

      console.log("unstake error ", error);
    }
  }, [p2pContract, token, setData]);

  const resetTrxState = useCallback(() => {
    setData(initialState);
  }, [setData, data]);

  useEffect(() => {
    setData(initialState);
  }, []);

  useEffect(() => {
    async function fechData() {
      if (userAuth?.jwtToken) {
        const res = await fetchUserTotalActiveDeposits(userAuth?.jwtToken);

        setActiveDeposits(res.data?.total_active_deposits);
      }
    }

    fechData();
  }, [userAuth, blockNumber]);

  useEffect(() => {
    if (!data?.hash) {
      return;
    }

    if (
      data?.status === TransactionState.COMPLETED ||
      data?.status === TransactionState.FAILED
    ) {
      return;
    }

    library
      ?.getTransactionReceipt(data?.hash)
      .then((res) => {
        if (res?.blockHash && res?.blockNumber) {
          setData({ ...data, status: TransactionState.COMPLETED, state: 3 });
        }
      })
      .catch((err) => {
        console.log("transaction failed ", err);
        setData({ ...data, status: TransactionState.FAILED, state: 4 });
      });
  }, [blockNumber]);

  const transactionStatus = useMemo(() => {
    return { status: data?.status, hash: data?.hash, state: data?.state };
  }, [data]);

  return [
    depositTokens,
    withdrawTokens,
    resetTrxState,
    transactionStatus,
    userDeposit,
  ];
}
