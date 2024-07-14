import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract } from 'ethers'

export const useContract = (contractAbi:any, contractAddress:any ) => {
    
    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()
  
    async function contract() {
      if (!isConnected) throw Error('User disconnected')
  
      const ethersProvider = new BrowserProvider(walletProvider as any)
      const signer = await ethersProvider.getSigner()
      const xcon =  new Contract(contractAddress, contractAbi, signer)

    }