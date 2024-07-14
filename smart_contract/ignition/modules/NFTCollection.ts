import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import {ethers} from "hardhat"

console.log("first")

export default buildModule("NFTCollectionModule", (m) => {
    const nft_collection =  m.contract("NFTCollection");
    const staking_reward_token =  m.contract("StakingRewardToken");
    
    return {nft_collection, staking_reward_token}
})

console.log("last")

