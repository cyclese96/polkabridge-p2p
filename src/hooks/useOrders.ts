// useGlobalOrders, filters: { orderType, fiat, token, orderBy,  }
// useUserOrders, filters: { active, ongoing, completed, cancelled }

import { useSelector } from "react-redux";
import useActiveWeb3React from "./useActiveWeb3React";

export const useGlobalOrders = () => {
  const { account } = useActiveWeb3React();
};
