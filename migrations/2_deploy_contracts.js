const CaptureTheFlag = artifacts.require("CaptureTheFlag");
const WhitelistPaymaster = artifacts.require("WhitelistPaymaster");
const RelayHub = artifacts.require("RelayHub");

module.exports = async function (deployer) {
  const forwarder = require("../build/gsn/Forwarder.json").address;
  await deployer.deploy(CaptureTheFlag, forwarder);

  await deployer.deploy(WhitelistPaymaster);
  const pm = await WhitelistPaymaster.deployed();

  pm.setTrustedForwarder(forwarder);

  await pm.whitelistSender("0x60bB6c1B4a0F5B1ea820be6c762384982b8a658c"); // for the whitelist, this address is now whitelisted.
  const relayHubAddress = require("../build/gsn/RelayHub.json").address;
  await pm.setRelayHub(relayHubAddress);
  const relayHub = await RelayHub.at(relayHubAddress);

  relayHub.depositFor(pm.address, { value: 1e18 }); // the deployer pay 1 eth to depositFor function to deposit to paymaster contract
};
