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

export const NETWORK_TYPE = 1; // testing:1, mainnet:0
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

export const GLOBAL_PAYMENT_OPTIONS = [
  {
    _id: 1,
    provider: "upi",
    desc: "UPI",
  },
  {
    _id: 2,
    provider: "neft",
    desc: "Bank Transfer",
  },
  {
    _id: 3,
    provider: "imps",
    desc: "Bank Transfer",
  },
];

export const GLOBAL_FIAT_LIST = [
  {
    added_at: "2022-06-20T11:43:48.690Z",
    _id: "6263a50d54f64766e549a621",
    country_name: "United States",
    fiat: "USD",
    fiat_label: "US doller",
  },
  {
    added_at: "2022-06-20T11:43:48.690Z",
    _id: "6267e54c3c805016884e50f9",
    country_name: "India",
    fiat: "INR",
    fiat_label: "Indian rupees",
  },
];

export const GLOBAL_TOKEN_LIST = {
  4: [
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6267ce443c805016884e50f7",
      name: "Polkabridge",
      symbol: "PBR",
      address: "0xf6c9FF0543f932178262DF8C81A12A3132129b51",
      decimals: 18,
      __v: 0,
      active: true,
      chainId: 4,
      logo: "https://assets.coingecko.com/coins/images/13744/small/symbol-whitebg200x200.png?1611377553",
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6290cb40ff6247480e2261bd",
      name: "US Tether",
      symbol: "USDT",
      address: "0xe687b0a94c3A20540552d981cD311a6812759dF8",
      decimals: 6,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
      chainId: 4,
    },
    {
      added_at: "2022-04-23T06:59:34.052Z",
      _id: "6290cc4dff6247480e2261be",
      name: "Ethereum",
      symbol: "ETH",
      address: "0xc778417e063141139fce010982780140aa0cd5ab",
      decimals: 18,
      __v: 0,
      active: true,
      logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
      chainId: 4,
    },
  ],
};
