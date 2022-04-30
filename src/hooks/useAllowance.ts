import { useMemo } from "react";
import { useSingleCallResult } from "../state/multicall/hooks";
import { useTokenContract } from "./useContract";
import { Token } from "../utils/interface";
import BigNumber from "bignumber.js";
import { ALLOWANCE_AMOUNT } from "../constants";

export function useTokenAllowance(
  token?: Token,
  owner?: string,
  spender?: string
): boolean {
  const contract = useTokenContract(token?.address, false);

  const inputs = useMemo(
    () => [owner?.toLowerCase(), spender?.toLowerCase()],
    [owner, spender]
  );
  const allowance = useSingleCallResult(contract, "allowance", inputs).result;

  return useMemo(
    () =>
      token && allowance
        ? new BigNumber(allowance[0]?.toString()).gte(ALLOWANCE_AMOUNT)
          ? true
          : false
        : false,
    [token, allowance]
  );
}
