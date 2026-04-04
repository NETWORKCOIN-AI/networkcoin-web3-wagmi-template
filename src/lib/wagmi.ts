import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, baseSepolia, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Web3 DApp',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Get from https://cloud.walletconnect.com
  chains: [sepolia, baseSepolia, mainnet],
  ssr: false,
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
