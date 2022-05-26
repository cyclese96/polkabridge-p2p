import { useCallback, useEffect, useMemo, useState } from "react";
import { toWei } from "../utils/helper";
import { TransactionStatus, Token, TransactionState } from "../utils/interface";
import useActiveWeb3React from "./useActiveWeb3React";
import useBlockNumber from "./useBlockNumber";
import { useP2pContract } from "./useContract";

export function useDepositCallback(
  token?: Token
): [() => {}, () => {}, TransactionStatus] {
  const { library, chainId } = useActiveWeb3React();
  const p2pContract = useP2pContract();
  const initialState: TransactionStatus = {
    hash: "",
    status: null,
  };
  const [data, setData] = useState<TransactionStatus>(initialState);
  const blockNumber = useBlockNumber();

  let stakeRes: any = null;

  const depositTokens = useCallback(
    async (tokenAmount?: string) => {
      try {
        const depositTokens = toWei(tokenAmount, token?.decimals);
        setData({ ...data, status: TransactionState.WAITING });

        stakeRes = await p2pContract?.depositToken(
          token?.address,
          depositTokens
        );
        setData({
          ...data,
          hash: stakeRes?.hash,
          status: TransactionState.PENDING,
        });
      } catch (error) {
        setData({ ...data, status: TransactionState.FAILED });

        console.log("depositTokens trx error ", { error });
      }
    },
    [p2pContract, token, setData]
  );

  const withdrawTokens = useCallback(async () => {
    try {
      setData({ ...data, status: TransactionState.WAITING });

      const res = await p2pContract?.withdrawToken(token?.address);

      setData({ ...data, hash: res?.hash, status: TransactionState.PENDING });
    } catch (error) {
      setData({ ...data, status: TransactionState.FAILED });

      console.log("unstake error ", error);
    }
  }, [p2pContract, token, setData]);

  useEffect(() => {
    setData(initialState);
  }, []);

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
          setData({ ...data, status: TransactionState.COMPLETED });
        }
      })
      .catch((err) => {
        console.log("transaction failed ", err);
        setData({ ...data, status: TransactionState.FAILED });
      });
  }, [blockNumber]);

  const transactionStatus = useMemo(() => {
    return { status: data?.status, hash: data?.hash };
  }, [data]);

  return [depositTokens, withdrawTokens, transactionStatus];
}
