/**
 * SPDX-License-Identifier:MIT
 */
pragma solidity ^0.8.0;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";

contract CaptureTheFlag is BaseRelayRecipient {
    event FlagCaptured(address previousHolder, address currentHolder);

    constructor(address forwarder) {
        _setTrustedForwarder(forwarder);
    }

    string public override versionRecipient = "2.2.0";

    address public currentHolder = address(0);

    function captureTheFlag() external {
        address previousHolder = currentHolder;

        currentHolder = _msgSender();

        emit FlagCaptured(previousHolder, currentHolder);
    }
}
