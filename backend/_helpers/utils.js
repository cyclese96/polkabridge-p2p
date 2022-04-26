const {
  VALIDATOR_ADDRESS,
  P2P_ADDRESS,
  TOKEN_ADDRESS,
  CURRENT_CHAIN,
} = require("../config/constants");

const Web3 = require("web3");
const validatorAbi = require("../_helpers/validatorAbi.json");
const p2pAbi = require("../_helpers/p2pAbi.json");
const BigNumber = require("bignumber.js");

async function recoverSignature(messageHash, signature) {
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://rinkeby.infura.io/v3/${process.env.TEST_INFURA_KEY}`
      )
    );
    const validatorContract = new web3.eth.Contract(
      validatorAbi,
      VALIDATOR_ADDRESS[4]
    );
    const recovered = await validatorContract.methods
      .recoverSigner(messageHash, signature)
      .call();

    return recovered;
  } catch (error) {
    console.log("contract call error ", error);
    return null;
  }
}

function isDeflationary(tokenAddress) {
  return (
    tokenAddress?.toLowerCase() ===
    TOKEN_ADDRESS.PBR[CURRENT_CHAIN].toLowerCase()
  );
}

function performDeduction(total, percentDeduction) {
  try {
    if (!percentDeduction) {
      return total;
    }

    return new BigNumber(total)
      .minus(new BigNumber(total).multipliedBy(percentDeduction).div(100))
      .toString();
  } catch (error) {}
}

function deflationaryDeduction(total, tokenAddress) {
  if (!isDeflationary(tokenAddress)) {
    return 0;
  }

  return new BigNumber(total).multipliedBy(0.5).div(100).toString();
}

function feeDeduction(total) {
  return new BigNumber(total).multipliedBy(1).div(100).toString();
}

async function verifyTokenDeposit(final_order_amount, tokenAddress, account) {
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://rinkeby.infura.io/v3/${process.env.TEST_INFURA_KEY}`
      )
    );
    const p2pContract = new web3.eth.Contract(
      p2pAbi,
      P2P_ADDRESS[CURRENT_CHAIN]
    );
    const userInfo = await p2pContract.methods
      .getUserInfo(account, tokenAddress)
      .call();

    console.log("user info ", {
      userInfo,
      flag: new BigNumber(final_order_amount).eq(userInfo._amount),
      final_order_amount,
    });
    if (!userInfo) {
      return false;
    }

    return new BigNumber(final_order_amount).eq(userInfo._amount);
  } catch (error) {
    console.log("verifyTokenDeposit call error ", error);
    return false;
  }
}

module.exports = {
  recoverSignature,
  verifyTokenDeposit,
  performDeduction,
  deflationaryDeduction,
  feeDeduction,
  isDeflationary,
};
