// 0 mainnet, 1 testnet
let network_type = 1;

let constants;
constants = {
  net: network_type,
  SUPPORTED_PAYMENT_METHODS: ["UPI", "BANK TRANSFER"],
  backend_url: "http://localhost:5002",
};

export default constants;
