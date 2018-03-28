var MyToken = artifacts.require("./PHRManager.sol");

module.exports = function(deployer) {
  deployer.deploy(MyToken/*, {gas: 6700000}*/);
};
