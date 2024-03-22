import dotenv from 'dotenv';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { foundry } from 'viem/chains';
import fetch from 'node-fetch'; // node-fetch를 import합니다.

global.fetch = fetch; // global scope에 fetch를 할당하여 Node.js 환경에서 사용할 수 있게 합니다.

dotenv.config();

const privateKey = process.env.WALLET_PRIVATE_KEY_1;
const recipientAddress = process.env.WALLET_ADDRESS_2;

async function sendEther() {
  // `createWalletClient` 사용으로 변경
  const account = privateKeyToAccount(privateKey); // 개인 키를 계정으로 변환
  const transport = http('http://127.0.0.1:8545'); // HTTP 트랜스포트 설정
  
  // Anvil을 사용하기 위한 walletClient 설정
  const walletClient = createWalletClient({
    chain: foundry, // 여기서 `foundry`는 Anvil 로컬 네트워크에 해당됩니다.
    transport: transport
  });

  try {
    const hash = await walletClient.sendTransaction({
      account,
      to: recipientAddress,
      value: 10000000000000000000n, // 10 이더 전송
    });
    console.log(`Transaction hash: ${hash}`);
  } catch (error) {
    console.error(`Error sending transaction: ${error}`);
  }
}

sendEther();

