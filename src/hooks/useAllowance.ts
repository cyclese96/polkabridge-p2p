import { useCallback, useEffect, useMemo, useState } from "react";
import { useSingleCallResult } from "../state/multicall/hooks";
import { useTokenContract } from "./useContract";
import { Token, TransactionState, TransactionStatus } from "../utils/interface";
import { BigNumber } from "@ethersproject/bignumber";
import { ALLOWANCE_AMOUNT, P2P_ADDRESSES } from "../constants";
import useBlockNumber from "./useBlockNumber";
import { toWei } from "../utils/helper";
import useActiveWeb3React from "./useActiveWeb3React";

export function useTokenAllowance(
  token?: Token
): [boolean, () => {}, TransactionStatus] {
  const tokenContract = useTokenContract(token?.address);
  const initialState: TransactionStatus = {
    hash: "",
    status: null,
  };
  const [data, setData] = useState(initialState);
  const blockNumber = useBlockNumber();
  const { account, chainId } = useActiveWeb3React();

  const owner = account;
  const spender = P2P_ADDRESSES?.[chainId || 4];

  const inputs = useMemo(
    () => [owner?.toLowerCase(), spender?.toLowerCase()],
    [owner, spender]
  );
  const allowance = useSingleCallResult(
    tokenContract,
    "allowance",
    inputs
  ).result;

  const confirmAllowance = useCallback(
    async (tokenAmount?: string) => {
      try {
        const _amount = toWei(tokenAmount, token?.decimals);
        console.log("allowance ", _amount);
        setData({ ...data, status: TransactionState.WAITING });
        const tx = await tokenContract?.approve(spender, _amount);

        setData({ ...data, hash: tx?.hash, status: TransactionState.PENDING });
      } catch (error) {
        console.log("confirmAllowance  ", error);
        setData({ ...data, status: TransactionState.FAILED });
      }
    },
    [tokenContract, setData]
  );

  useEffect(() => {
    setData(initialState);
  }, []);

  const allowanceStatus = useMemo(
    () =>
      token && allowance
        ? BigNumber.from(allowance?.toString()).gt(0)
          ? true
          : false
        : false,
    [token, allowance, blockNumber]
  );

  const transactionStatus = useMemo(() => {
    return { status: data?.status, hash: data?.hash };
  }, [data]);

  return [allowanceStatus, confirmAllowance, transactionStatus];
}
