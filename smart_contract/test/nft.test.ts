import {ethers} from "hardhat";
import {expect} from "chai";
import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("NFT Staking DAPP", ()=>{

    const deploy_smart_contract = async () => {

        const [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const NFTCollection = await ethers.getContractFactory("NFTCollection");
        const nft_collection = await NFTCollection.deploy();
        await nft_collection.waitForDeployment()
        const nft_collection_address = nft_collection.getAddress()
        
        const StakingRewardToken = await ethers.getContractFactory("StakingRewardToken");
        const staking_reward_token = await StakingRewardToken.deploy();
        await staking_reward_token.waitForDeployment();
        const staking_reward_token_address = staking_reward_token.getAddress()
        

        const NFTStaking = await ethers.getContractFactory("NFTStaking");
        const nft_staking = await NFTStaking.deploy(nft_collection_address, staking_reward_token_address);
        await nft_staking.waitForDeployment();
        const nft_staking_address =  await nft_staking.getAddress()



        await (await nft_collection.safeMint(owner, "JOHN")).wait();
        await (await nft_collection.safeMint(owner, "Dan")).wait();

        const smartContracts = {nft_collection, staking_reward_token, nft_staking};
        const smartContractAddresses = {
            nft_collection_address, 
            staking_reward_token_address, 
            nft_staking_address
        }
        return {smartContracts, smartContractAddresses, owner, addr1, addr2, addr3};
    }
    describe("Smart Contract Deployments:", ()=> {
        it("Should mint NFT", async()=> {
            const {
                smartContracts: {nft_collection}, 
                owner
            } = await loadFixture(deploy_smart_contract);
        
            
            expect(await nft_collection.symbol()).to.equal("MNFT");
            expect(await nft_collection.name()).to.equal("MyNFT");
            expect((await nft_collection.ownerOf(0))).to.be.equal(owner);
            expect(((await nft_collection.items(0)).authur)).to.be.equal("JOHN");
            expect(((await nft_collection.items(0)).isReveal)).to.be.equal(false);
            expect(await nft_collection.getTotalSupply()).to.be.equal(2);
            // console.log(await nft_collection.getApproved())

        })

        it("NFTCollection Should approve NFTStaking to tranfer tokens", async()=>{
            const {
                smartContracts:{
                    nft_collection, 
                    nft_staking
                },
                smartContractAddresses:{
                    nft_collection_address, 
                    staking_reward_token_address, 
                    nft_staking_address
                } ,
                owner
            } = await loadFixture(deploy_smart_contract);
            await nft_collection.approve(nft_staking_address,0)
            expect(await nft_collection.getApproved(0)).to.be.equal( nft_staking_address);
            expect(await nft_collection.getApproved(1)).to.not.equal(nft_staking_address);   

        })

    })
    
    describe("NFT Collection:", async () => {
      
        it("Should mint NFT", async()=> {
            const {smartContracts: {nft_collection}, owner} = await loadFixture(deploy_smart_contract);
            
            expect(await nft_collection.symbol()).to.equal("MNFT");
            expect((await nft_collection.ownerOf(0))).to.be.equal(owner);
            await (await nft_collection.safeMint(owner, "Mccain")).wait();
            expect(await nft_collection.getTotalSupply()).to.be.greaterThan(2);
            expect(await nft_collection.getTotalSupply()).to.be.lessThan(4);

        })
        it("Should transfer NFT", async()=> {
            const {smartContracts: {nft_collection}, owner, addr1} = await loadFixture(deploy_smart_contract);

            expect(await nft_collection.ownerOf(0)).to.be.equal(owner)

            await nft_collection["safeTransferFrom(address,address,uint256)"](owner, addr1, 0)
            expect((await nft_collection.ownerOf(0))).to.not.equal(owner);
            expect((await nft_collection.ownerOf(0))).to.be.equal(addr1);
            
            await nft_collection.transferFrom(owner, addr1, 1)
            // expect(await nft_collection.)
        })

        it("Should verify owner before transfer", async ()=> {
            const {smartContracts: {nft_collection}, owner, addr1, addr2} = await loadFixture(deploy_smart_contract);
            
            expect(await (await nft_collection["safeTransferFrom(address,address,uint256)"](owner, addr2, 1)).wait())
        })
    })
    describe("Staking Reward Token:", async () => {
      
        it("Should mint token", async()=> {
            const {smartContracts: {staking_reward_token}, owner} = await loadFixture(deploy_smart_contract);
            
            expect(await staking_reward_token.symbol()).to.equal("STR");
            await(await staking_reward_token.mint(owner.address, 2000000000000000)).wait();
            expect((await staking_reward_token.balanceOf(owner))).to.be.equal(200);
        })
        it("Should transfer token", async()=> {
            const {smartContracts: {nft_collection}, owner} = await loadFixture(deploy_smart_contract);
            
            expect(await nft_collection.symbol()).to.equal("MNFT");
            expect((await nft_collection.ownerOf(0))).to.be.equal(owner)
        })

        it("Should stake NFT", async()=> {
            const {
                smartContracts:{
                    nft_collection, 
                    nft_staking
                },
                smartContractAddresses:{
                    nft_collection_address, 
                    staking_reward_token_address, 
                    nft_staking_address
                } ,
                owner
            } = await loadFixture(deploy_smart_contract);
            await (await nft_staking.stake(0)).wait();
        })
    
        it("Should unstacke NFT", async () => {
            const {
                smartContracts:{
                    nft_collection, 
                    nft_staking
                },
                smartContractAddresses:{
                    nft_collection_address, 
                    staking_reward_token_address, 
                    nft_staking_address
                } ,
                owner
            } = await loadFixture(deploy_smart_contract);
            await (await nft_staking.stake(0)).wait();
            expect(await nft_collection.ownerOf(0)).to.be.equal(nft_staking_address);
            expect((await nft_staking.getVaultInfo(0)).isStaked).to.be.equal(true);
            await (await nft_staking.unStake(0)).wait();
            expect(await nft_collection.ownerOf(0)).to.be.equal(owner)
            expect((await nft_staking.getVaultInfo(0)).isStaked).to.be.reverted;
            console.log()
        })

        
    })

    describe("NFT Staking:", async () => {
      
        it("Should mint NFT", async()=> {
            const {smartContracts: {nft_collection}, owner} = await loadFixture(deploy_smart_contract);
            
            expect(await nft_collection.symbol()).to.equal("MNFT");
            expect((await nft_collection.ownerOf(0))).to.be.equal(owner)
        })
        it("Should mint NFT", async()=> {
            const {smartContracts: {nft_collection}, owner} = await loadFixture(deploy_smart_contract);
            
            expect(await nft_collection.symbol()).to.equal("MNFT");
            expect((await nft_collection.ownerOf(0))).to.be.equal(owner)
        })

        it("Should stake NFT", async()=> {
            const {
                smartContracts:{
                    nft_collection, 
                    nft_staking
                },
                smartContractAddresses:{
                    nft_collection_address, 
                    staking_reward_token_address, 
                    nft_staking_address
                } ,
                owner
            } = await loadFixture(deploy_smart_contract);
            await (await nft_staking.stake(0)).wait();
        })
    
        it("Should unstackeTransactions NFT", async () => {
            const {
                smartContracts:{
                    nft_collection, 
                    nft_staking
                },
                smartContractAddresses:{
                    nft_collection_address, 
                    staking_reward_token_address, 
                    nft_staking_address
                } ,
                owner
            } = await loadFixture(deploy_smart_contract);
            await (await nft_staking.stake(0)).wait();
            expect(await nft_collection.ownerOf(0)).to.be.equal(nft_staking_address);
            expect((await nft_staking.getVaultInfo(0)).isStaked).to.be.equal(true);
            await (await nft_staking.unStake(0)).wait();
            expect(await nft_collection.ownerOf(0)).to.be.equal(owner)
            expect((await nft_staking.getVaultInfo(0)).isStaked).to.be.reverted;
            console.log()
        })

        
    })


})