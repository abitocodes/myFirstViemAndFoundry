// This directive is specific to Next.js and tells the framework that the code should only be executed on the client side.
'use client';

// Imports
import { wagmiConfig, projectId } from '@/blockchain/config'; // Importing the configuration for wagmi, including the projectId.
import { createWeb3Modal } from '@web3modal/wagmi/react'; // Function to create a Web3Modal instance for connecting to blockchain wallets.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Importing QueryClient (to manage and cache asynchronous operations) and its provider.
import { State, WagmiProvider } from 'wagmi'; // Importing types and provider from wagmi, a set of React hooks for Ethereum.

// Initialize a new QueryClient instance to manage asynchronous and server state in React applications.
const queryClient = new QueryClient();

// Ensuring that a projectId is defined, otherwise throw an error. This is crucial for the wagmi configuration to connect to blockchain networks properly.
if (!projectId) throw new Error('Project ID is not defined');

// Creating a Web3Modal with specified options. This modal provides a user interface for connecting to various blockchain wallets.
createWeb3Modal({
  wagmiConfig, // Passing the wagmi configuration object that includes network information and providers.
  projectId, // The projectId obtained from the wagmi configuration, used for analytics and other features.
  themeMode: 'dark', // Setting the theme of the modal to dark mode.
  // Below is an example of how to customize the theme further, commented out for demonstration.
  // themeVariables: {
  //   "--w3m-accent": "cyan",
  //   "--w3m-border-radius-master": "0px"
  // }
});

// Web3Modal component that wraps its children with WagmiProvider and QueryClientProvider. This setup is required to use wagmi's hooks and react-query's features in the component tree.
export function Web3Modal({ children, initialState }: { children: React.ReactNode; initialState?: State }) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}> {/* WagmiProvider initializes wagmi with the given configuration and initial state, making blockchain functionalities available to child components. */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> {/* QueryClientProvider makes the QueryClient instance available to child components, enabling them to use react-query hooks for data fetching, caching, and updating. */}
    </WagmiProvider>
  );
}
