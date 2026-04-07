import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

/**
 * Wagmi v2 config using createConfig with http transports.
 *
 * Usage with WagmiProvider (in your App or main entry):
 *
 *   import { WagmiProvider } from 'wagmi';
 *   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 *   import { config } from './lib/wagmi';
 *
 *   const queryClient = new QueryClient();
 *
 *   function App() {
 *     return (
 *       <WagmiProvider config={config}>
 *         <QueryClientProvider client={queryClient}>
 *           { /* your app components */ }
 *         </QueryClientProvider>
 *       </WagmiProvider>
 *     );
 *   }
 */
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Contract addresses will be populated after deployment
export const CONTRACT_ADDRESSES = {
  sepolia: '0x0000000000000000000000000000000000000000', // Will be updated after deployment
  baseSepolia: '0x0000000000000000000000000000000000000000', // Will be updated after deployment
  mainnet: '0x0000000000000000000000000000000000000000', // Will be updated after deployment
} as const;

// Simple Storage Contract ABI - matches our SimpleStorage.sol
export const SIMPLE_STORAGE_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "_initialValue", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "newValue", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "changedBy", "type": "address"}
    ],
    "name": "ValueChanged",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "decrement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getValue",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "newValue", "type": "uint256"}],
    "name": "setValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
