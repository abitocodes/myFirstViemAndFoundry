// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "forge-std/Script.sol";
import "src/QuickAcaciaToken.sol";

contract DeployQuickAcaciaToken is Script {
    function run() external {
        vm.startBroadcast();
        new QuickAcaciaToken();
        vm.stopBroadcast();
    }
}
