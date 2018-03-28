var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "payment priority tool stand thought rug sail food rigid web hope soap"; 

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider:  new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
            gas: 3000000,
            network_id: '3',
        },
        test: {
            provider: new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/"),
            network_id: '*',
        },
    }
};