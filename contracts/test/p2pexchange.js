import {expect} from 'chai';
const P2P = artifacts.require("P2PExchange");

contract("P2PExchange", (accounts) => {
    it("should put 10000 MetaCoin in the first account", async () => {
        const p2pInstance = await P2P.deployed();
        const balance = await metaCoinInstance.getBalance.call(accounts[0]);
    
        assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
      });
});
