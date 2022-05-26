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

const fromWei = (tokens, decimals = 18) => {
  try {
    if (!tokens) {
      return new BigNumber(0).toString();
    }

    return new BigNumber(tokens)
      .div(new BigNumber(10).exponentiatedBy(decimals))
      .toString();
  } catch (error) {
    console.log("exeption in fromWei ", error);
    return null;
  }
};

const toWei = (tokens, decimals = 18) => {
  try {
    if (!tokens) {
      return new BigNumber(0).toString();
    }
    return new BigNumber(tokens)
      .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
      .toFixed(0)
      .toString();
  } catch (error) {
    console.log("exeption in toWei , ", error);
    return null;
  }
};

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

    // console.log("user info ", {
    //   userAmount: userInfo._amount,
    //   flag: new BigNumber(final_order_amount).eq(userInfo._amount),
    //   final_order_amount,
    // });
    if (!userInfo) {
      return false;
    }

    return new BigNumber(final_order_amount).eq(userInfo._amount);
  } catch (error) {
    console.log("verifyTokenDeposit call error ", error);
    return false;
  }
}

// checks if array 1 includes all the values of array2
function isArrayIncludes(array1, array2) {
  let flag = true;
  array2.forEach((item) => {
    if (!array1.includes(item)) {
      flag = false;
    }
  });

  return flag;
}

function isValidUpiId(upiId) {
  if (!upiId) {
    return false;
  }

  const upiExp = /\d*@\w*/;
  const match = upiId?.match(upiExp);

  console.log("matched ", match);
  if (!match) {
    return false;
  }
  return match?.[0] === upiId;
}

function isValidAccountNumber(accountNumber) {
  if (!accountNumber) {
    return false;
  }

  const accountNumberExp = /\d*/;
  const match = accountNumber?.match(accountNumberExp);
  if (!match) {
    return false;
  }
  return match?.[0] === accountNumber;
}

module.exports = {
  recoverSignature,
  verifyTokenDeposit,
  performDeduction,
  deflationaryDeduction,
  feeDeduction,
  isDeflationary,
  fromWei,
  toWei,
  isArrayIncludes,
  isValidUpiId,
  isValidAccountNumber,
};
