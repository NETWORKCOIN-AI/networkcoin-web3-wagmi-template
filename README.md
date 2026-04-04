# 🚀 Web3 DApp Template

A modern, production-ready Web3 template built with React, Vite, Wagmi, RainbowKit, and shadcn/ui. Perfect for AI-scaffolded Web3 applications with seamless smart contract deployment.

## ✨ Features

- **🔗 Web3 Integration**: Wagmi + RainbowKit for wallet connections
- **🎨 Modern UI**: shadcn/ui components with Tailwind CSS
- **⚡ Fast Development**: Vite for lightning-fast builds
- **📱 Responsive Design**: Mobile-first responsive layout
- **🔐 Multi-Network**: Sepolia, Base Sepolia, Mainnet support
- **📄 Smart Contracts**: Auto-detects contracts in `contracts/` directory
- **🚀 One-Click Deploy**: Integrates with drinklemonade.ai deployment system

## 🏗️ Template Structure

```
├── contracts/                 # Smart contracts (.sol files)
│   └── SimpleStorage.sol      # Example contract
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Web3Provider.tsx  # Web3 context provider
│   │   ├── ConnectWallet.tsx # Wallet connection component
│   │   └── ContractInteraction.tsx # Contract interaction UI
│   ├── lib/
│   │   └── wagmi.ts         # Wagmi configuration
│   └── App.tsx              # Main application
└── package.json             # Dependencies
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### 3. Deploy Smart Contract
- Use the Web3 Deploy Panel in drinklemonade.ai
- Contracts in `contracts/` directory are auto-detected
- One-click deployment to Sepolia/Base Sepolia

### 4. Update Contract Address
After deployment, update the contract address in `src/lib/wagmi.ts`:
```typescript
export const CONTRACT_ADDRESSES = {
  sepolia: '0xYourDeployedContractAddress',
  baseSepolia: '0xYourDeployedContractAddress',
  // ...
};
```

## 🔧 Configuration

### Wallet Connect Project ID
Get your Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com) and update in `src/lib/wagmi.ts`:

```typescript
export const config = getDefaultConfig({
  appName: 'Your DApp Name',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID',
  // ...
});
```

## 📄 Smart Contracts

### Adding New Contracts
1. Add your `.sol` files to the `contracts/` directory
2. Update the ABI in `src/lib/wagmi.ts`
3. Deploy using drinklemonade.ai Web3 Deploy Panel
4. Update contract addresses after deployment

### Example Contract Structure
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract YourContract {
    // Your contract code here
}
```

## 🌐 Supported Networks

- **Sepolia Testnet** (Chain ID: 11155111)
- **Base Sepolia** (Chain ID: 84532)  
- **Ethereum Mainnet** (Chain ID: 1)

## 🎨 UI Components

Built with shadcn/ui components:
- Cards, Buttons, Inputs
- Dialogs, Tooltips, Separators
- Form components with validation
- Responsive grid layouts

## 🔗 Web3 Features

- **Wallet Connection**: MetaMask, WalletConnect, Coinbase Wallet
- **Network Switching**: Automatic network detection and switching
- **Contract Interaction**: Read/write contract functions
- **Transaction Handling**: Loading states and confirmations
- **Error Handling**: User-friendly error messages

## 🚀 Deployment Integration

This template is designed to work seamlessly with the drinklemonade.ai deployment system:

1. **AI Scaffolding**: AI generates complete Web3 apps using this template
2. **Contract Detection**: Auto-detects `.sol` files in `contracts/` directory
3. **One-Click Deploy**: Deploy contracts directly from the chat interface
4. **Real-time Logs**: Watch deployment progress in real-time
5. **Multi-Network**: Deploy to Sepolia, Base Sepolia, or other networks

## 📚 Learn More

- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://rainbowkit.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

This template is part of the drinklemonade.ai ecosystem. Contributions welcome!

---

**Built with ❤️ for the Web3 community**
