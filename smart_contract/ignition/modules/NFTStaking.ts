import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import {ethers} from "hardhat"
import saveFrontendFiles from "../utils";
import EXEC from "child_process";

const exec = EXEC.exec;

async function main(){

    exec("npx hardhar clean");
    
    const NFTCollection = await ethers.getContractFactory("NFTCollection");
    const nft_collection = await NFTCollection.deploy();
    const nft_collection_address = await nft_collection.getAddress()
    
    const StakingRewardToken = await ethers.getContractFactory("StakingRewardToken");
    const staking_reward_token = await StakingRewardToken.deploy();
    const staking_reward_token_address = await staking_reward_token.getAddress();
    
    
    
    const NFTStacking = await ethers.getContractFactory("NFTStaking");
    const nft_staking = await NFTStacking.deploy(nft_collection_address, staking_reward_token_address);
    const nft_staking_address = await nft_staking.getAddress();
    
    saveFrontendFiles(NFTCollection, "NFTCollection", nft_collection_address);
    saveFrontendFiles(StakingRewardToken, "StakingRewardToken", staking_reward_token_address);
    saveFrontendFiles(NFTStacking, "NFTStacking", nft_staking_address);

}
main().then(()=> process.exit(0)).catch((er) => process.exit(1));

export default buildModule("NFTStakingModule", (m) => {
    const lock =  m.contract("Lock");
    // const staking_reward_token =  m.contract("StakingRewardToken");
    return {lock}
})
