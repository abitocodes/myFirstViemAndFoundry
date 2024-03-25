import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

// Set a desired pattern for the address to match.
const desiredPattern = '0x1234';

// Define a function to find an address that starts with the desired pattern.
function findDesiredAddress() {
  let found = false;
  let attempts = 0;

  // Keep trying until the desired address is found.
  while (!found) {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey)
    // Check if the generated account's address starts with the desired pattern.
    if (account.address.startsWith(desiredPattern)) {
      // If a match is found, log the success message and the details of the account.
      console.log(`Found a matching address after ${attempts} attempts!`);
      console.log(`Address: ${account.address}`);
      console.log(`Private Key: ${privateKey}`);
      found = true;
    } else {
      // If the address does not match, increment the attempt counter.
      attempts += 1;
      // Log a message every 1000 attempts to update on the search progress.
      if (attempts % 1000 === 0) {
        console.log(`${attempts} attempts made, still searching...`);
      }
    }
  }
}

// Call the function to start the search for a desired address pattern.
findDesiredAddress();
