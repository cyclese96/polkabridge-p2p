import { SupportedChainId } from "../constants/chains";

const INFURA_KEY = "8af4f9aa936e427f85063ea3a4adaa35"; // for testing only
if (typeof INFURA_KEY === "undefined") {
  throw new Error(
    `REACT_APP_INFURA_KEY must be a defined environment variable`
  );
}

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
// export const INFURA_NETWORK_URLS: { [key in SupportedChainId]: string } = {
//   [SupportedChainId.MAINNET]: `https://rpc.ankr.com/eth`,
//   [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
// };
