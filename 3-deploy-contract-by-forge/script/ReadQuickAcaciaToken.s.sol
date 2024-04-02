// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "forge-std/Script.sol";
import "src/QuickAcaciaToken.sol";

contract ReadContractScript is Script {
    function run() external {
        // 배포된 컨트랙트의 주소를 여기에 입력하세요
        // address deployedAddress = "0x838953C09885E324A976E047141BC81037B501D5";
        address deployedAddress = address(0);

        QuickAcaciaToken token = QuickAcaciaToken(deployedAddress);

        // 컨트랙트의 함수 호출 예제
        console.log("Name:", token.name());
        console.log("Symbol:", token.symbol());
        console.log("Message:", token.message());
    }
}
