import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract } from 'ethers'
import { useEffect, useState } from 'react'

export const useContract = (contractAbi:any, contractAddress:any ) => {
    const [contracts, setContracts] = useState()
    const { isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()
  
    async function contract() {
      if (!isConnected) throw Error('User disconnected')
  
      const ethersProvider = new BrowserProvider(walletProvider as any)
      const signer = await ethersProvider.getSigner()
      const xcon =  new Contract(contractAddress, contractAbi, signer)
      setContracts(xcon as any)
    }

    useEffect(() => {
      contract()
    }, [contractAbi, contractAddress])
    

    return {contracts};
} 

