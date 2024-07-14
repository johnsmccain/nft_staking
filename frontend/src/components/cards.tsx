import { Card } from './card'
import nftABI from "../../contractsData/NFTCollection.json";
import nftAddress from "../../contractsData/NFTCollection-address.json"
import {} from "ethers";
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider } from 'ethers';
import { Contract } from 'ethers';
import { useEffect } from 'react';
export const Cards = () => {
    const {address, isConnected} = useWeb3ModalAccount();
    const {walletProvider} = useWeb3ModalProvider();
    async function loadNFTs(){
        if (!isConnected) throw Error("user disconnected!");
        const  ethersProvider = new BrowserProvider(walletProvider as any);
        const signer = await ethersProvider.getSigner();
        const contract = new Contract(nftAddress.address, nftABI.abi, signer);
        console.log(await contract.items(0))
    }

    useEffect(() => {
      loadNFTs()
    }, [])
    
    
  return (
    <div className="flex flex-wrap mx-auto justify-center">
				{Array(10)
					.fill(0)
					.map(() => (
						<Card />
					))}
			</div>
  )
}
