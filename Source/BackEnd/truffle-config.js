var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "opinion destroy betray ..."; // 12 word mnemonic

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/");
            },
            network_id: '3',
        },
        // test: {
        //     provider: function() {
        //         return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
        //     },
        //     network_id: '*',
        // },
    }
};