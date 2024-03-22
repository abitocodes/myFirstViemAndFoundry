// 예제 코드: 0x1234로 시작하는 지갑 주소를 찾기 위한 스크립트

import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

// 원하는 주소 패턴 설정
const desiredPattern = '0x1234';

function findDesiredAddress() {
  let found = false;
  let attempts = 0;

  while (!found) {
    // 새 개인 키 생성
    const privateKey = generatePrivateKey();
    // 개인 키로 계정 생성
    const account = privateKeyToAccount(privateKey);
    // 생성된 계정의 주소가 원하는 패턴으로 시작하는지 확인
    if (account.address.startsWith(desiredPattern)) {
      console.log(`Found a matching address after ${attempts} attempts!`);
      console.log(`Address: ${account.address}`);
      console.log(`Private Key: ${privateKey}`);
      found = true;
    } else {
      attempts += 1;
      // 상태 업데이트를 위해 1000번의 시도마다 로그 출력
      if (attempts % 1000 === 0) {
        console.log(`${attempts} attempts made, still searching...`);
      }
    }
  }
}

findDesiredAddress();
