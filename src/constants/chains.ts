export enum SupportedChainId {
  MAINNET = 1,
  RINKEBY = 4,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: "mainnet",
  [SupportedChainId.RINKEBY]: "rinkeby",
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];

export const MULTICALL_ADDRESS: { [index: string]: string } = {
  1: "0x3a2Bd96Da4B14C30918aE0fC0E784E2F56120F1d",
  4: "0x6c4f9282bBD29992bF4F064F0165e805336Eef59",
  97: "0x688EC8C059592104fC713E0dA9276e649302C4Ab",
  56: "0x6e568FcE995F5c7ddaFB8C0b74B3241328498F8A",
  137: "0xbfB508313126cf61CFb3BD7e570cC79C67998A53",
};

export const NATIVE_TOKEN: { [index: number]: string } = {
  1: "ETH",
  4: "ETH",
  97: "BNB",
  56: "BNB",
  137: "MATIC",
  80001: "MATIC",
  1666600000: "ONE",
  1666700000: "ONE",
};

export const CHAIN_IDS = {
  MAINNET: 1,
  RINKEBY: 4,
  POLYGON: 137,
  MUMBAI: 80001,
};

export const NETWORK_DETAILS = {
  mainnet: {
    chainId: `0x${CHAIN_IDS.MAINNET.toString(16)}`,
    chainName: "Ethereum Mainnet",
    chainRaw: CHAIN_IDS.MAINNET,
  },
  testnet: {
    chainId: `0x${CHAIN_IDS.RINKEBY.toString(16)}`,
    chainName: "Rinkeby Test Network",
    chainRaw: CHAIN_IDS.RINKEBY,
  },
};
