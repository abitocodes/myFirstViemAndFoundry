// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract QuickAcaciaToken is ERC721 {
    constructor() ERC721("quick-acacia", "Q-AUUI-AII") {
    }

    function message() public pure returns (string memory) {
        return "Unleash the power of DeFi - tkwon5";
    }
}