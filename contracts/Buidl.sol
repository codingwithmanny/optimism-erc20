//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BuidlToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("BuidlToken", "BDL") {
        _mint(msg.sender, initialSupply);
    }

    /**
     * Contract Owner - Increase the total supply and add it to their wallet
     */
    function mint(uint256 amount) external onlyOwner {
        _mint(msg.sender, amount);
    }

    /**
     * User - Decrease their total supply
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
