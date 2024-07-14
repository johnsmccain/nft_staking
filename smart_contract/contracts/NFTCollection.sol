// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;


import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCollection is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {}

    uint256 private _nextTokenId;
    string private baseURL = "https://ipfs.io/ipfs/QmWiQE65tmpYzcokCheQmng2DCM33DEhjXcPB6PanwpAZo";
    string public preRevealURL =  "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=";
   
    // mapping(uint256  => address) public ownerOf;
    // mapping(uint256  => bool) public isReveal;
    // mapping(uint256 => string) public tokenURL;
    // VS
    struct Item{
        address ownerOf;
        bool isReveal;
        string tokenURL;
        string authur;
    }
    mapping(uint256 => Item) public items;

    event ItemLog (uint256 tokenId, address ownerOf, string url, bool isReveal, string authur);
    modifier onlyOwner(address _owner){
        require(_owner == msg.sender,"Only true owner can perform this action");
        _;
    }
    function safeMint(address _to, string memory _authur) external {
        uint256 _tokenId = _nextTokenId++;
        _safeMint(_to, _tokenId);
        items[_tokenId].ownerOf = msg.sender;
        items[_tokenId].isReveal = false;
        items[_tokenId].tokenURL = preRevealURL;
        items[_tokenId].authur = _authur;

        emit ItemLog(_tokenId, msg.sender, preRevealURL, false, _authur);
    }

    function setReveal(uint256 _tokenId) external  onlyOwner(items[_tokenId].ownerOf){
        require(!items[_tokenId].isReveal, "You've reveal this item already!");
        items[_tokenId].isReveal = true;
        items[_tokenId].tokenURL = baseURL;
        emit ItemLog(_tokenId, msg.sender, items[_tokenId].tokenURL, items[_tokenId].isReveal, items[_tokenId].authur);
    }

    function setReveal(uint256 _tokenId, string memory _uri) external onlyOwner(items[_tokenId].ownerOf){
        require(items[_tokenId].isReveal, "You've to reveal this item first!");
        items[_tokenId].tokenURL = _uri;
        emit ItemLog(_tokenId, msg.sender, items[_tokenId].tokenURL, items[_tokenId].isReveal, items[_tokenId].authur);
    }

    function transferFrom(address from,address to, uint256 _tokenId) public  override  {
        // safeTransferFrom(from, to, _tokenId);
        _safeTransfer(from, to, _tokenId);
        items[_tokenId].ownerOf = to;
    }

    function mintMany() external{}

    function getTotalSupply() external view returns(uint256){
        return _nextTokenId;
    }

}
