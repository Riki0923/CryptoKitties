const Kittycontract = artifacts.require("Kittycontract");
const MarketPlace = artifacts.require("KittyMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(MarketPlace, Kittycontract.address);
};
