// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingRewardToken is ERC20, ERC20Burnable {
    constructor()
        ERC20("StakingRewardToken", "SRT")
       
        // ERC20Permit("StakingRewardToken")
    {}

    function mint(address to, uint256 amount) public  {
        _mint(to, amount);
    }
}