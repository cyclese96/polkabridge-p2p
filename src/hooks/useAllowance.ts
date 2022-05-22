import { useCallback, useMemo, useState } from "react";
import { useSingleCallResult } from "../state/multicall/hooks";
import { useTokenContract } from "./useContract";
import { Token, TransactionStatus } from "../utils/interface";
import { BigNumber } from "@ethersproject/bignumber";
import { ALLOWANCE_AMOUNT, P2P_ADDRESSES } from "../constants";
import useBlockNumber from "./useBlockNumber";
import { toWei } from "../utils/helper";
import useActiveWeb3React from "./useActiveWeb3React";
import { MaxUint256 } from "@ethersproject/constants";
import { get } from "lodash";

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

export function useTokenAllowance(
  token?: Token
): [boolean, () => {}, TransactionStatus] {
  const tokenContract = useTokenContract(token?.address);
  const [data, setData] = useState({ hash: "", status: "" });
  const blockNumber = useBlockNumber();
  const { account, chainId } = useActiveWeb3React();

  const owner = account;
  const spender = "0xC6C4f1f496Fe6Bd584aa876f02AAAcDb0C7dBCe3";

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
        setData({ ...data, status: "waiting" });

        const estimatedGas = await tokenContract?.estimateGas
          .approve(spender, MaxUint256)
          .catch(() => {
            // general fallback for tokens who restrict approval amounts
            // useExact = true
            return tokenContract?.estimateGas.approve(spender, _amount);
          });

        const contractMethod = get(tokenContract, "approve");
        const methodArgs = [spender, _amount];
        const overrides = {
          gasLimit: calculateGasMargin(
            estimatedGas ? estimatedGas : BigNumber.from(200000)
          ),
        };
        const tx = await contractMethod(...methodArgs, { ...overrides });
        // const res = await tokenContract?.approve(spender, _amount, {
        //   gasLimit: calculateGasMargin(estimatedGas!),
        // });

        setData({ ...data, hash: tx?.hash, status: "pending" });
      } catch (error) {
        setData({ ...data, status: "" });

        console.log("confirmAllowance trx error ", { error, token, account });
      }
    },
    [tokenContract, setData]
  );

  const allowanceStatus = useMemo(
    () =>
      token && allowance
        ? BigNumber.from(ALLOWANCE_AMOUNT).gt(0)
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
