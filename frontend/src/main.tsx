import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'


// 1. Your WalletConnect Cloud project ID
const projectId = 'cf271a0605867c344534a8174111259f'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const hardhat = {
	chainId: 31337,
	name: 'hardhat',
	currency: 'GO',
	explorerUrl: 'https://etherscan.io',
	rpcUrl: 'http://127.0.0.1:8545/'
  }

// 3. Create a metadata object
const metadata = {
  name: 'NFTStaking',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, hardhat],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
	

			<App />
	
		</BrowserRouter>
	</React.StrictMode>
);
