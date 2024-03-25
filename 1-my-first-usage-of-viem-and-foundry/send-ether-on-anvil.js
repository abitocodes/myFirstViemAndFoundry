import dotenv from 'dotenv';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { foundry } from 'viem/chains';
import fetch from 'node-fetch';

// Assign `fetch` to the global scope to make it available across the entire Node.js environment.
global.fetch = fetch;

dotenv.config();
const privateKey = process.env.WALLET_PRIVATE_KEY_1;
const recipientAddress = process.env.WALLET_ADDRESS_2;

async function sendEther() {
  const account = privateKeyToAccount(privateKey);
  const transport = http('http://127.0.0.1:8545');
  
  // Create a wallet client for interacting with the Anvil network, specifying the chain and transport method.
  const walletClient = createWalletClient({
    chain: foundry, // `foundry` represents the Anvil local network in this context.
    transport: transport
  });

  try {
    // Attempt to send a transaction using the wallet client.
    const hash = await walletClient.sendTransaction({
      account, // The sender's account.
      to: recipientAddress, // The recipient's address.
      value: 10000000000000000000n, // The amount to send (10 Ether), using BigInt for precise representation.
    });
    // Log the transaction hash if the transaction is successfully sent.
    console.log(`Transaction hash: ${hash}`);
  } catch (error) {
    // Log any errors encountered during the transaction.
    console.error(`Error sending transaction: ${error}`);
  }
}

sendEther();
