export const NetworkContextName = "NETWORK";
export const supportedChains = [
  1, 4, 1285, 1287, 97, 56, 137, 80001, 1666700000, 1666600000,
];

export const ALLOWANCE_AMOUNT = "999999999";

export const P2P_ADDRESSES: { [index: number]: string } = {
  1: "",
  4: "0xC6C4f1f496Fe6Bd584aa876f02AAAcDb0C7dBCe3",
};

export const CONNECTOR_TYPE = {
  injected: "injected",
  walletConnect: "walletConnect",
};

export const NETWORK_TYPE = 1;
export const SUPPORTED_PAYMENT_METHODS = ["upi", "BANK TRANSFER"];

export const TOKENS = {
  4: {
    ETH: {
      name: "Ether",
      decimals: 18,
      symbol: "ETH",
      address: "",
      chainId: 4,
    },
  },
};
