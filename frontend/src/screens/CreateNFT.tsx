import nftABI from "../../contractsData/NFTCollection.json"
import nftAddress from "../../contractsData/NFTCollection-address.json"
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'

export const CreateNFT = () => {
	const {address, isConnected }  = useWeb3ModalAccount();
	const {walletProvider} =  useWeb3ModalProvider();
	
	async function mentNFT(){
		if (!isConnected) throw Error('User disconnected')
		const ethersProvider = new BrowserProvider(walletProvider as any)
		const signer = await ethersProvider.getSigner()
		const contract = new Contract(nftAddress.address, nftABI.abi, signer);
		await contract.safeMint(address, "JoHN")
	}

	return <div className="my-5">
		<div className="mx-auto w-fit">
			<button onClick={mentNFT} className="bg-green-700 hover:bg-green-900 px-3 py-2 rounded-lg">Mint NFT</button>
		</div>
	</div>;
};
