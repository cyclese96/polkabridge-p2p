// const BigNumber = require('bignumber.js');

// const PWAR = "0x16153214e683018d5aa318864c8e692b66e16778"; // bsc test net Polka War token address
// // const lpToken = "0x782F693Da5E54B9B26C379F4f82988632808ED34";
// const polkaWarGame = artifacts.require("PolkaWar");
// const PolkaWarFaucet = artifacts.require("PolkaWarFaucet");
// const rewardMultiplier = 90;
// const claimAmount = 1000;
// const PolkaBridge = "0xf6c9ff0543f932178262df8c81a12a3132129b51";
// const devAddress = "0xfEEF5F353aE5022d0cfcD072165cDA284B65772B";
const P2PExchange = artifacts.require("P2PExchange");
const WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";
// const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";//test
const fee = 1;
module.exports = async function(deployer) {
    // await deployer.deploy(PolkaBridge);//, "0xf6c9ff0543f932178262df8c81a12a3132129b51");
    // let pbrDeployed = PolkaBridge.deployed();
    // console.log("PBR deployed at ", PolkaBridge.address);
    // await deployer.deploy(PolkaBridgeFarm, PolkaBridge, new BigNumber(500000000000000000), 0);
    // await deployer.deploy(polkaWarGame, PWAR, rewardMultiplier);
    // await deployer.deploy(PolkaWarFaucet, PWAR, claimAmount);
    // console.log("polkaWarGame deployed at ", polkaWarGame.address);
    // console.log("PolkaWarFaucet deployed at ", PolkaWarFaucet.address);
    await deployer.deploy(P2PExchange, WETH, fee);
    console.log("P2PExchange deployed at ", P2PExchange.address);
};
