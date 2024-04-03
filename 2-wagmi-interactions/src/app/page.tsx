// page.tsx:

// This directive tells Next.js that this component should only run in the client-side environment.
'use client';

// Imports from React and other libraries.
import { useState } from 'react'; // Importing useState hook for component state management.
import { useAccount } from 'wagmi'; // A hook to get the current user's account information from wagmi (a React hook library for Ethereum).
import { formatUnits, parseUnits } from 'viem'; // Utility functions for handling Ethereum units.
import ConnectButton from '@/components/shared/ConnectButton'; // Custom component for handling wallet connection.
import { useTokenRead, useTokenWrite } from '@/blockchain/hooks'; // Custom hooks for reading from and writing to the blockchain.
import useToast from '@/hooks/useToast'; // A custom hook for displaying toast notifications.

// The functional component definition for the Home page.
export default function Home() {
  const toast = useToast(); // Initializing the useToast hook to show notifications.
  const { address } = useAccount(); // Destructuring to get the user's wallet address from the account info.
  
  // State for holding the recipient's address input by the user.
  const [recipient, setRecipient] = useState('');
  
  // Custom hooks to read various token properties from the blockchain.
  const tokenName = useTokenRead<string>('name');
  const tokenBalance = useTokenRead<bigint>('balanceOf', [address]);
  const tokenDecimals = useTokenRead<bigint>('decimals');
  const tokenSymbol = useTokenRead<string>('symbol');
  
  // A hook to interact with the blockchain's 'transfer' function.
  const tokenTransfer = useTokenWrite('transfer', {
    onSuccess(data) { // Callback for handling successful transfer operations.
      console.log('data: transfer write ', data);
    },
  });

  // Extracting and processing the data obtained from the blockchain.
  const tokenNameData = tokenName.data;
  const tokenDecimalsData = Number(tokenDecimals.data);
  const tokenBalanceData = formatUnits(tokenBalance.data || BigInt(0), tokenDecimalsData);
  const tokenSymbolData = tokenSymbol.data as string;

  // Function to handle token transfers on form submission.
  const handleTransfer = async () => {
    if (!recipient) return toast('Please enter recipient address', 'error'); // Ensuring a recipient is entered.
    const amount = parseUnits('10', tokenDecimalsData); // Parsing the amount to the correct unit based on the token's decimals.
    await tokenTransfer.write([recipient, amount]); // Initiating the token transfer.
    toast('Transfer successful', 'success'); // Notifying the user of a successful transfer.
  };

  // JSX for rendering the page.
  return (
    <main className="h-screen w-full flex justify-center items-center bg-black text-white">
      <div className="flex flex-col gap-5 items-center">
        <ConnectButton /> {/* Component for connecting the user's wallet. */}
      </div>
    </main>
  );
}
