const { VALIDATOR_ADDRESS } = require("../config/constants");

const Web3 = require("web3");
const validatorAbi = require("../_helpers/validatorAbi.json");

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

module.exports = { recoverSignature };
