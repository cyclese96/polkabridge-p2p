export interface Token {
  name: string;
  decimals: number;
  symbol: string;
  address: string;
  chainId: number;
}

export interface PoolInfo {
  apy: string;
  staked: string;
  claimed: string;
}

export interface UserStakedInfo {
  staked: string;
  claimed: string;
  pending: string;
}

export enum TransactionState {
  WAITING = "WAITING",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface TransactionStatus {
  status: TransactionState | null;
  hash: string | null;
}

export interface AuthStatus {
  authenticated: boolean;
  account: string | null | undefined;
}

export interface CreateOrderStatus {
  type: string;
  id?: string | null;
  status?: string;
  loading: boolean;
  error?: string;
}

export interface ApiResponse {
  status: boolean;
  data: any;
  message?: string;
}

export enum CreateStatus {
  PENDING = "PENDING",
  SUBMITTED = "SUBMITTED",
  ACTIVE = "ACTIVE",
  FAILED = "FAILED",
}

export interface OrderList extends Array<any> {}
