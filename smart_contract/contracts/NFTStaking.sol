// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;
// import openzeppelin standard
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./NFTCollection.sol";
import "./StakingRewardToken.sol";

contract NFTStaking is ERC721Holder {
    // pointers for ERC721 and ERC20
    StakingRewardToken str;
    NFTCollection nft;

    uint256 private stakeCounter;

    constructor(NFTCollection _nft, StakingRewardToken _str) {
        str = _str;
        nft = _nft;
    }

    struct Stake {
        address ownerOf;
        uint256 stakeAt;
        uint256 tokenId;
        bool isStaked;
    }

    mapping(uint256 => Stake) private vault;

    event stakeLog(address ownerOf, uint256 stakeAt, uint256 tokenId, bool isStaked);
    event unStakeLog(address ownerOf, uint256 stakeAt, uint256 tokenId, bool isStaked);
    event claim(address ownerOf, uint256 tokens, uint256 tokenId, bool isStaked);

    modifier onlyOwner(address _owner) {
        require(
            _owner == msg.sender,
            "Only the true owner can perform this function"
        );
        _;
    }

    function stake(uint256 _tokenId) external onlyOwner(nft.ownerOf(_tokenId)) {
        // require(vault[_tokenId].tokenId == _tokenId, "");
        nft.safeTransferFrom(msg.sender, address(this), _tokenId);
        emit stakeLog(vault[_tokenId].ownerOf, _tokenId, block.timestamp, true);
        vault[_tokenId] = Stake({
            ownerOf: msg.sender,
            stakeAt: block.timestamp,
            tokenId: _tokenId,
            isStaked: true
        });
    }

    function unStake(uint256 _tokenId)
        external
       
    {
        nft.transferFrom(address(this), msg.sender, _tokenId);
        str.mint(msg.sender, calculateRewards(_tokenId));
        emit unStakeLog(
            address(this), 
            vault[_tokenId].stakeAt, 
            _tokenId,
            vault[_tokenId].isStaked
        );
        delete vault[_tokenId];
    }

    function claimToken(uint256 _tokenId) external {
        // require(vault[]);
        uint256 reward = calculateRewards(_tokenId);
        str.mint(msg.sender, reward);
        emit stakeLog(msg.sender, reward, _tokenId, false);
        vault[_tokenId] = Stake({
            ownerOf: msg.sender,
            stakeAt: block.timestamp,
            tokenId: _tokenId,
            isStaked: true
        });
    }
    function getVaultInfo(uint256 _tokenId) view external returns(Stake memory){
        return vault[_tokenId];
    }

    function getTotalLockSupply() external view returns(uint256){
        return stakeCounter;
    }

    function calculateRewards(uint256 _tokenId) public view  returns (uint256) {
        return (1000 ether * (block.timestamp - vault[_tokenId].stakeAt)) / 1 days;
    }
}
